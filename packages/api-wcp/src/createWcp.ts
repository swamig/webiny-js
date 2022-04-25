import { Wcp } from "~/types";
import { getWcpProjectLicense } from "~/utils";

export const createWcp = async (): Promise<Wcp> => {
    const projectLicense = await getWcpProjectLicense();

    return {
        isProject: () => {
            return Boolean(projectLicense);
        },
        getProjectLicense: () => {
            return projectLicense;
        }
    };
};
