import { Context } from "@webiny/handler/types";

export interface WcpContext extends Context {
    wcp: Wcp;
}

export interface Wcp {
    isProject: () => boolean;
    getProjectLicense: () => DecryptedWcpProjectLicense | null;
}

export type EncryptedWcpProjectLicense = string;

export interface DecryptedWcpProjectLicense {
    id: string;
    orgId: string;
    package: any;
}
