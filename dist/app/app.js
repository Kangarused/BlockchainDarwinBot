"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
// Import Modules
const BlockchainDarwinBootstrapper = require("../custom_modules/blockchain-darwin-bot/core/bootstrapper");
const price_module_1 = require("../common_modules/coin-market-cap/core/price-module");
const bitconnect_module_1 = require("../common_modules/bitconnect-easter-eggs/core/bitconnect-module");
class App {
    constructor() {
        this.express = express();
        this.bcd = new BlockchainDarwinBootstrapper.default();
        this.setup();
    }
    setup() {
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        // Setup Modules
        this.bcd.setup([price_module_1.default, bitconnect_module_1.default]);
    }
}
exports.default = new App();
//# sourceMappingURL=app.js.map