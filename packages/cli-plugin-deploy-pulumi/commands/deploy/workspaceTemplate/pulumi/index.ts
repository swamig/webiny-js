import projectApplication from "../webiny.application";

export = async () => {
    // @ts-ignore
    return projectApplication.pulumi.runProgram({
        env: "{DEPLOY_ENV}",
    });
};
