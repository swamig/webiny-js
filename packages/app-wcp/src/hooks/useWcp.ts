import { useContext, useCallback } from "react";
import { WcpContext, WcpContextValue } from "../contexts";
import { WcpProject } from "~/types";

interface UseWcpHook {
    getProject: () => WcpProject | null;
    canUseFeature: (featureId: string) => boolean;
}

export function useWcp(): UseWcpHook {
    const context = useContext<WcpContextValue>(WcpContext);

    const getProject = () => context.project;
    const canUseFeature = useCallback(
        featureId => {
            console.log("canUseFeature", context);
            return context.project?.package?.features?.[featureId]?.enabled === true;
        },

    );

    return { getProject, canUseFeature } as UseWcpHook;
}
