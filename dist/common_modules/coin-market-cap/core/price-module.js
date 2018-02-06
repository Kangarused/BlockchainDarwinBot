"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_service_1 = require("../../../services/event-service");
const price_cmd_1 = require("../commands/price-cmd");
const error_cmd_1 = require("../commands/error-cmd");
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
    }
}
exports.default = PriceModule;
//# sourceMappingURL=price-module.js.map