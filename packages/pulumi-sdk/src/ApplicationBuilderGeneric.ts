import { PulumiApp } from "./PulumiApp";
import { ApplicationBuilderConfig } from "./ApplicationBuilder";
import { ApplicationContext } from "./ApplicationConfig";

export interface ApplicationGenericConfig extends ApplicationBuilderConfig {
    app(ctx: ApplicationContext): Promise<PulumiApp> | PulumiApp;
}

export function createGenericApplication(config: ApplicationGenericConfig) {
    return config;
}
