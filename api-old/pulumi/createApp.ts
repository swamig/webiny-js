import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { defineApp, PulumiApp } from "@webiny/pulumi-sdk";
import { createPublicAppBucket } from "@webiny/pulumi-aws/apps/createAppBucket";
import { getStackOutput } from "@webiny/cli-plugin-deploy-pulumi/utils";

const AdminApp = defineApp({
    name: "Admin",
    async config(app) {
        const { bucket, origin } = createPublicAppBucket(app, "admin-app");

        const output = await getStackOutput({ env: "test", folder: "api-old" });

        console.log("stack output", output);

        const iamForLambda = new aws.iam.Role("iamForLambda", {
            assumeRolePolicy: `{
              "Version": "2012-10-17",
              "Statement": [
                {
                  "Action": "sts:AssumeRole",
                  "Principal": {
                    "Service": "lambda.amazonaws.com"
                  },
                  "Effect": "Allow",
                  "Sid": ""
                }
              ]
            }
            `
        });

        const lambda = app.addResource(aws.lambda.Function, {
            name: "test-lambda",
            config: {
                handler: "index.handler",
                timeout: 25,
                runtime: "nodejs14.x",
                memorySize: 1600,
                role: iamForLambda.arn,
                code: new pulumi.asset.AssetArchive({
                    ".": new pulumi.asset.FileArchive("../code/build")
                }),
                environment: {
                    variables: { S3_BUCKET: bucket.output.id }
                }
            }
        });

        app.addOutputs({
            bucketId: bucket.output.id,
            lambda: lambda.output.arn
        });

        return {
            bucket,
            origin,
            lambda
        };
    }
});

export const createApp = async (): Promise<PulumiApp> => {
    // Create the app instance.
    const app = new AdminApp({
        env: String(process.env.WEBINY_ENV),
        variant: null,
        appDir: process.cwd() + "/api-old",
        projectDir: process.cwd()
    });

    // Run the default application setup.
    await app.setup();

    return app;
};
