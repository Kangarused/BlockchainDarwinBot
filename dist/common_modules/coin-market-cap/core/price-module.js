"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_service_1 = require("../../../services/event-service");
const price_cmd_1 = require("../commands/price-cmd");
const error_cmd_1 = require("../commands/error-cmd");
const top_performer_cmd_1 = require("../commands/top-performer-cmd");
const worst_performer_cmd_1 = require("../commands/worst-performer-cmd");
class PriceModule {
    static InjectEvents(eventService) {
        eventService.addTrigger(event_service_1.default.EventTypes.message, "Get Coin Price", ">Price <coin name>\n>Price <coin name> <currency ticker>\n>price power-ledger aud", "I will check coinmarketcap for the latest price of the specified coin. " +
            "You can also add a currency ticker to the end to have the price shown in your preferred currency! \n\u200b\n" +
            "Available currency tickers are:\n" + price_cmd_1.default.allowedCurrencies.join(', ') + "\n\u200b\n", /^([>!][pP]rice )+(.*)$/, (message) => {
            var content = message.content.substr(7);
            var components = content.split(' ');
            if (components.length >= 2) {
                price_cmd_1.default.getCoinPrice(message, components[0], components[1].toUpperCase());
            }
            else if (components.length == 1) {
                price_cmd_1.default.getCoinPrice(message, components[0]);
            }
            else {
                error_cmd_1.default.announceError(message.channel);
            }
        });
        eventService.addTrigger(event_service_1.default.EventTypes.message, "Get Top Performer", ">top performer <# of coins to include>\n>top performer <# of coins to include> <timeframe (1h, 24h, 7d)>\n>top performer 24h\n!top performer 100 24h", "I will check coinmarketcap starting from the #1 spot and working my way down for the number of coins you instructed me to include " +
            "and I will identify the coin that has performed the best within the timeframe you have specified! \n\u200b\n", /^([>!][tT]op [pP]erformer )(.{1,3})( )?(([0-9]{1,2})[hd])?$/, (message) => {
            var content = message.content.toLowerCase().substr(15);
            var components = content.split(' ');
            if (components.length >= 2) {
                top_performer_cmd_1.default.getTopPerformer(message, components[0], components[1]);
            }
            else if (components.length == 1) {
                top_performer_cmd_1.default.getTopPerformer(message, components[0]);
            }
            else {
                error_cmd_1.default.announceError(message.channel);
            }
        });
        eventService.addTrigger(event_service_1.default.EventTypes.message, "Get Worst Performer", ">worst performer <# of coins to include>\n>worst performer <# of coins to include> <timeframe (1h, 24h, 7d)>\n>worst performer 24h\n!worst performer 100 24h", "I will check coinmarketcap starting from the #1 spot and working my way down for the number of coins you instructed me to include " +
            "and I will identify the coin that has performed the worst within the timeframe you have specified! \n\u200b\n", /^([>!][wW]orst [pP]erformer )(.{1,3})( )?(([0-9]{1,2})[hd])?$/, (message) => {
            var content = message.content.toLowerCase().substr(17);
            var components = content.split(' ');
            if (components.length >= 2) {
                worst_performer_cmd_1.default.getWorstPerformer(message, components[0], components[1]);
            }
            else if (components.length == 1) {
                worst_performer_cmd_1.default.getWorstPerformer(message, components[0]);
            }
            else {
                error_cmd_1.default.announceError(message.channel);
            }
        });
    }
}
exports.default = PriceModule;
//# sourceMappingURL=price-module.js.map