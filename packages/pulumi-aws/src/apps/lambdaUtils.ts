import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { PulumiApp } from "@webiny/pulumi-sdk";

import { VpcConfig } from "./common";

interface LambdaRoleParams {
    name: string;
    policy?: pulumi.Output<aws.iam.Policy>;
    executionRole?: pulumi.Input<string>;
}

export function createLambdaRole(app: PulumiApp, params: LambdaRoleParams) {
    const role = app.addResource(aws.iam.Role, {
        name: params.name,
        config: {
            assumeRolePolicy: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "sts:AssumeRole",
                        Principal: {
                            Service: "lambda.amazonaws.com"
                        },
                        Effect: "Allow"
                    }
                ]
            }
        }
    });

    if (params.policy) {
        app.addResource(aws.iam.RolePolicyAttachment, {
            name: `${params.name}-policy`,
            config: {
                role: role.output,
                policyArn: params.policy.arn
            }
        });
    }

    if (params.executionRole) {
        // If execution role is set, use it.
        app.addResource(aws.iam.RolePolicyAttachment, {
            name: `${params.name}-execution-role`,
            config: {
                role: role.output,
                policyArn: params.executionRole
            }
        });
    } else {
        // Fallback to default execution role.
        const vpc = app.getModule(VpcConfig);

        app.addResource(aws.iam.RolePolicyAttachment, {
            name: `${params.name}-execution-role`,
            config: {
                role: role.output,
                policyArn: vpc.enabled
                    ? aws.iam.ManagedPolicy.AWSLambdaVPCAccessExecutionRole
                    : aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole
            }
        });
    }

    return role;
}

export function getCommonLambdaEnvVariables(app: PulumiApp) {
    const environmentVariables: Record<string, any> = {
        STAGED_ROLLOUTS_VARIANT: app.ctx.variant || "",
        // Among other things, this determines the amount of information we reveal on runtime errors.
        // https://www.webiny.com/docs/how-to-guides/environment-variables/#debug-environment-variable
        DEBUG: String(process.env.DEBUG)
    };

    if (process.env["WCP_PROJECT_ENVIRONMENT"]) {
        environmentVariables["WCP_PROJECT_ENVIRONMENT"] = process.env["WCP_PROJECT_ENVIRONMENT"];
    }

    if (process.env["WCP_API_URL"]) {
        environmentVariables["WCP_API_URL"] = process.env["WCP_API_URL"];
    }

    if (process.env["WCP_APP_URL"]) {
        environmentVariables["WCP_APP_URL"] = process.env["WCP_APP_URL"];
    }

    return environmentVariables;
}
