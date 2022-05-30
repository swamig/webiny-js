const fs = require("fs");
const path = require("path");

// If we have `pulumi/index.ts` file in a project application, that means we're
// dealing with old project applications where all of the Pulumi code is located
// in user's project. New projects applications have this code abstracted away.
module.exports = projectApplication => {
    return !fs.statSync(path.join(projectApplication.root, "pulumi", "index.ts"));
};
