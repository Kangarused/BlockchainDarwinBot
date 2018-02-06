"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
// Get the heroku index page and display message to show successfull deployment
app_1.default.express.get("/", (req, res) => {
    res.send("Deployment Successful");
});
//# sourceMappingURL=index.js.map