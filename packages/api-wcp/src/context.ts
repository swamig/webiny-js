import { ContextPlugin } from "@webiny/handler";
import { WcpContext } from "~/types";
import { createWcp } from "~/createWcp";

export const createWcpContext = () => {
    return new ContextPlugin<WcpContext>(async context => {
        context.wcp = await createWcp();

        context.waitFor('security', () => {
            const orgGetPermission = context.security.getPermission;
            context.security.getPermission = () => {
                // context.wcp.canUseFeature('advancedAccessControlLayer')
                // is it custom?
                // only check for these apps - pb, fb, cms
                // security.getStorageOperations().getSYstem()
                // ako je createdOn < datum_release, preskaci sve WCP checkove
                // napomeni u notion documentu drukciju implementacju
                // ako ima nesto vise od name u permission objektu, znaci da se radi o custom permisiji
                // testove provjeriti
                return orgGetPermission();
            }
        })
    });
};
