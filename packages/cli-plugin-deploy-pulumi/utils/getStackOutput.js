const execa = require("execa");
const mapStackOutput = require("./mapStackOutput");
const { getProject } = require("@webiny/cli/utils");

const cache = {};
const getOutputJson = ({ folder, env, cwd }) => {
    const project = getProject();

    console.log("GSO:::getOutputJson", { folder, env, cwd });

    if (cache[folder + env]) {
        console.log("GSO:::CACHE HIT");
        return cache[folder + env];
    }

    try {
        console.log("GSO:::CMD");
        console.log(
            ["webiny", "output", folder, "--env", env, "--json", "--no-debug"].filter(Boolean)
        );
        const { stdout } = execa.sync(
            "yarn",
            ["webiny", "output", folder, "--env", env, "--json", "--no-debug"].filter(Boolean),
            {
                cwd: cwd || project.root
            }
        );

        console.log("GSO:stdout", stdout);

        // Let's get the output after the first line break. Everything before is just yarn stuff.
        const extractedJSON = stdout.substring(stdout.indexOf("{"));
        return (cache[folder + env] = JSON.parse(extractedJSON));
    } catch (e) {
        console.log("GSO:::ERROR");
        console.log(e);
        return null;
    }
};

module.exports = (folderOrArgs, env, map) => {
    if (!folderOrArgs) {
        throw new Error("Missing initial argument.");
    }

    // Normalize arguments.
    let args = {};
    if (typeof folderOrArgs === "string") {
        args = {
            folder: folderOrArgs,
            env: env,
            map: map
        };
    } else {
        args = folderOrArgs;
    }

    if (!args.folder) {
        throw new Error(`Please specify a project application folder, for example "apps/admin".`);
    }

    if (!args.env) {
        throw new Error(`Please specify environment, for example "dev".`);
    }

    console.log("GSO:::finalArgs", args);
    const output = getOutputJson(args);
    if (!output) {
        return output;
    }

    if (!args.map) {
        return output;
    }

    return mapStackOutput(output, args.map);
};
