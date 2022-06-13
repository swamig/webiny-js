import { Pulumi } from "@webiny/pulumi-sdk";

interface StackOutput {
    apiUrl: string;
    region: string;
    dynamoDbTable: string;
    [key: string]: any;
}

export function tagResources(tags: Record<string, string>): void;

export function crawlDirectory(dir: string, callback: (path: string) => void): void;

export function getStackOutput(
    folder: string,
    env: string,
    map?: Record<string, string>
): StackOutput;

export function getStackOutput(options: {
    folder: string;
    env: string;
    variant?: string;
    map?: Record<string, string>;
    cwd?: string;
}): StackOutput;

interface GetPulumiParams {
    projectApplication?: Record<string, unknown>;
    pulumi?: Options
    install?: boolean;
}

export function getPulumi(params: GetPulumiParams): Pulumi;
