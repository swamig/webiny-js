import { createPulumiApp, PulumiAppInput, PulumiProgram } from "@webiny/pulumi-sdk";
import {
    ApiGateway,
    ApiApwScheduler,
    ApiCloudfront,
    ApiFileManager,
    ApiGraphql,
    ApiHeadlessCMS,
    ApiPageBuilder
} from "~/apps";
import { StorageOutput, VpcConfig } from "./../common";
import { applyCustomDomain, CustomDomainParams } from "../customDomain";

export interface CreateApiAppConfig<TPPRV = Record<string, unknown>> {
    /**
     * Enables or disables VPC for the API.
     * For VPC to work you also have to enable it in the Storage application.
     */
    vpc?: PulumiAppInput<boolean>;

    /** Custom domain configuration */
    domain?: PulumiAppInput<CustomDomainParams>;

    pulumi?: PulumiProgram<TPPRV>;
}

export function createApiApp<TPPRV = Record<string, unknown>>(
    projectAppConfig: CreateApiAppConfig<TPPRV> = {}
) {
    return {
        id: "api",
        name: "API",
        description:
            "Represents cloud infrastructure needed for supporting your project's (GraphQL) API.",
        path: "api",
        cli: {
            // Default args for the "yarn webiny watch ..." command.
            watch: {
                // Watch five levels of dependencies, starting from this project application.
                depth: 5
            }
        },
        pulumi: createPulumiApp({
            name: "api",
            path: "api",
            config: projectAppConfig,
            program: async () => {
                return { fileManager: "string-wohooo" };
            }
        })
    };
}

const a = createApiApp({
    pulumi: (app) => {
        return app.programReturnValue.fileMa
    }
});

const aa = a.pulumi.programReturnValue.fileManager
