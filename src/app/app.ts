import * as express from 'express';
import * as bodyParser from 'body-parser';

// Import Modules
import * as BlockchainDarwinBootstrapper from '../custom_modules/blockchain-darwin-bot/core/bootstrapper';
import PriceModule from '../common_modules/coin-market-cap/core/price-module';
import BitconnectModule from '../common_modules/bitconnect-easter-eggs/core/bitconnect-module';

class App {
    public express: any;

    // Declare Modules
    public bcd: any;

    constructor() {
        this.express = express();
        this.bcd = new BlockchainDarwinBootstrapper.default();
        this.setup();
    }

    private setup() {
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(bodyParser.json()); 

        // Setup Modules
        this.bcd.setup([PriceModule, BitconnectModule]);
    }
}

export default new App()