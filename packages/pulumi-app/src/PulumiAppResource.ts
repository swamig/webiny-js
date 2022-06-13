import * as pulumi from "@pulumi/pulumi";

export interface ResourceConstructor<T = any, TArgs = any> {
    new (name: string, args: TArgs, opts?: pulumi.CustomResourceOptions): T;
}

export type ResourceType<T extends ResourceConstructor> = T extends ResourceConstructor<infer TType>
    ? TType
    : never;

export type ResourceArgs<T extends ResourceConstructor> = T extends ResourceConstructor<
    any,
    infer TArgs
>
    ? Exclude<TArgs, undefined>
    : never;

export interface CreateResourceParams<TCtor extends ResourceConstructor> {
    name: string;
    config: ResourceArgs<TCtor>;
    opts?: pulumi.CustomResourceOptions;
}

export interface ResourceConfigModifier<T> {
    (value: pulumi.Unwrap<T>): T | void;
}

export interface ResourceConfigSetter<T> {
    (value: T): void;
    (fcn: ResourceConfigModifier<T>): void;
}

export type ResourceConfigProxy<T extends object> = {
    readonly [K in keyof T]-?: ResourceConfigSetter<T[K]>;
};

export interface PulumiAppResource<T extends ResourceConstructor> {
    name: string;
    readonly config: ResourceConfigProxy<ResourceArgs<T>>;
    readonly opts: pulumi.CustomResourceOptions;
    readonly output: pulumi.Output<pulumi.Unwrap<ResourceType<T>>>;
}
