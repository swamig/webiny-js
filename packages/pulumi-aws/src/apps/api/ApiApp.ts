import { ApplicationContext, ApplicationConfig } from "@webiny/pulumi-sdk";

import { CustomDomainParams } from "../customDomain";
import { AppInput } from "../utils";

export interface ApiAppConfig extends ApplicationConfig {
    /**
     * Enables or disables VPC for the API.
     * For VPC to work you also have to enable it in the `storage` application.
     */
    vpc?: AppInput<boolean | undefined>;

    /** Custom domain configuration */
    domain?(ctx: ApplicationContext): CustomDomainParams | undefined | void;
}

export type ApiApp = InstanceType<typeof ApiApp>;
