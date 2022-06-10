import { ApplicationHook } from "./ApplicationHook";
import { PulumiApp } from "./createPulumiApp";

export interface ApplicationContext {
    env: string;
    variant?: string | null;
    appDir: string;
    projectDir: string;
}

export interface ApplicationHooks {
    // TODO add typing to deploy hooks
    onBeforeBuild: ApplicationHook;
    onAfterBuild: ApplicationHook;
    onBeforeDeploy: ApplicationHook;
    onAfterDeploy: ApplicationHook;
}

export interface ApplicationConfig<TApp extends PulumiApp> extends Partial<ApplicationHooks> {
    config?(app: TApp, ctx: ApplicationContext): Promise<void> | void;
}
