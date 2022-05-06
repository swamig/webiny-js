const path = require("path");
const fs = require("fs");
const { green } = require("chalk");
const { Pulumi, getPulumiWorkDir } = require("@webiny/pulumi-sdk");
const ora = require("ora");
const merge = require("lodash/merge");
const { getProject } = require("@webiny/cli/utils");

module.exports = async (options = {}) => {
    const spinner = new ora();
    const projectRoot = getProject().root;

    const cwd = process.cwd();

    let pulumiWorkDir = cwd;

    console.log("GET_PULUMI:::pulumiWorkDir", pulumiWorkDir);

    if (options.folder) {
        // With new Pulumi architecture Pulumi.yaml file should sit somewhere in .pulumi dir.
        // For backwards compatibility we fall back to app source dir in case it doesn't exist.
        pulumiWorkDir = getPulumiWorkDir(projectRoot, options.folder);

        console.log("GET_PULUMI:::pulumiWorkDir222", pulumiWorkDir);
        console.log(
            "GET_PULUMI:::pulumiWorkDir333",
            fs.existsSync(path.join(pulumiWorkDir, "Pulumi.yaml"))
        );

        if (!fs.existsSync(path.join(pulumiWorkDir, "Pulumi.yaml"))) {
            pulumiWorkDir = path.join(projectRoot, options.folder);
            console.log("GET_PULUMI:::pulumiWorkDir444", pulumiWorkDir);
        }
    }

    const pulumi = new Pulumi(
        merge(
            {
                pulumiFolder: path.join(projectRoot, ".webiny"),
                beforePulumiInstall: () => {
                    console.log(
                        `It looks like this is your first time using ${green(
                            "@webiny/pulumi-sdk"
                        )}.`
                    );
                    spinner.start(`Downloading Pulumi...`);
                },
                afterPulumiInstall: () => {
                    spinner.stopAndPersist({
                        symbol: green("✔"),
                        text: `Pulumi downloaded, continuing...`
                    });
                }
            },
            {
                execa: {
                    cwd: pulumiWorkDir
                }
            }
        )
    );

    // Run install method, just in case Pulumi wasn't installed yet.
    if (options.install !== false) {
        await pulumi.install();
    }

    return pulumi;
};
