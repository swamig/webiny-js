import fetch from "node-fetch";
import { DecryptedWcpProjectLicense, EncryptedWcpProjectLicense } from "~/types";

export const getWcpApiUrl = (path?: string) => {
    const apiUrl = process.env.WCP_API_URL || "https://d2d4evj0p7twjc.cloudfront.net";
    return path ? apiUrl + path : apiUrl;
};

export const getWcpAppUrl = (path?: string) => {
    const appUrl = process.env.WCP_API_URL || "https://app.webiny.com";
    return path ? appUrl + path : appUrl;
};

export function getWcpProjectId(split: true): [string, string];
export function getWcpProjectId(split: false): string;
export function getWcpProjectId(split: boolean) {
    const wcpProjectId = process.env.WCP_PROJECT_ID;
    if (!wcpProjectId) {
        return split ? [null, null] : null;
    }

    if (!split) {
        return wcpProjectId;
    }

    const [orgId = null, projectId = null] = wcpProjectId.split("/");
    return [orgId, projectId];
}

export const getWcpProjectEnvironmentApiKey = () => {
    return process.env.WCP_PROJECT_ENVIRONMENT_API_KEY;
};

export const getWcpProjectLicense = async () => {
    const apiKey = getWcpProjectEnvironmentApiKey();
    if (!apiKey) {
        return null;
    }

    const [orgId, projectId] = getWcpProjectId(true);
    if (!orgId || !projectId) {
        return null;
    }

    // Fetch and decrypt the license.
    const getLicenseEndpoint = getWcpApiUrl(`/orgs/${orgId}/projects/${projectId}/license`);

    const encryptedLicense: EncryptedWcpProjectLicense | null = await fetch(getLicenseEndpoint, {
        headers: { apiKey }
    })
        .then(response => response.text())
        .catch(e => {
            console.error(
                `An error occurred while trying to retrieve the license for project "${orgId}/${projectId}": ${e.message}`
            );
            return null;
        });

    if (!encryptedLicense) {
        return null;
    }

    try {
        // For now, when we say "decrypt", we're basically just base64 decoding the received string.
        const decryptedLicense = Buffer.from(encryptedLicense, "base64").toString("utf-8");
        return JSON.parse(decryptedLicense) as DecryptedWcpProjectLicense;
    } catch {
        return null;
    }
};
