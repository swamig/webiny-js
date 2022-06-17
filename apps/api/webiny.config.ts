import { createBuildFunction, createWatchFunction } from "@webiny/project-utils";
import glob from "fast-glob";
import normalize from "normalize-path";

const cwd = normalize(__dirname);

/**
 * Detects all functions (files ending with ".fn.ts" suffix) as entrypoints.
 */
const entry = () => {
    const entries = glob.sync(`${cwd}/*.fn.ts`).reduce((current, p) => {
        const [, name] = p.match(/.*\/(.*)\.fn\.ts/);
        current[name] = p;
        return current;
    }, {});

    if (Object.values(entries).length === 0) {
        throw new Error("Could not find any '*.fn.ts' files to watch.");
    }

    return entries;
};

export default {
    commands: {
        build: createBuildFunction({
            cwd,
            overrides: {
                webpack(config) {
                    config.entry = entry;
                    config.output.filename = "[name]/handler.js";
                    return config;
                }
            }
        }),
        watch: createWatchFunction({
            cwd,
            overrides: {
                webpack(config) {
                    config.entry = entry;
                    config.output.filename = "[name]/handler.js";
                    return config;
                }
            }
        })
    }
};
