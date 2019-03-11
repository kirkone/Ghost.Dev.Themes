const fs = require('fs-extra')

let jobs = {
    "../node_modules/ghost/content": "content",
};

try {
    for (var key in jobs) {
        fs.copySync(key, jobs[key])
    };
} catch (err) {
    console.error(err)
}
