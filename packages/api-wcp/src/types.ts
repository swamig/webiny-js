import { Context } from "@webiny/handler/types";

export interface WcpContext extends Context {
    wcp: Wcp;
}

export interface Wcp {
    projectInitialized: boolean
}
