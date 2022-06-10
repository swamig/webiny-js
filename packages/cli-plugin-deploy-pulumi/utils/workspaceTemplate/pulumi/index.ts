import projectApplication from "../webiny.application";

export = async () => {
    return projectApplication.pulumi.runProgram({
        env: "{DEPLOY_ENV}",
    });
};
