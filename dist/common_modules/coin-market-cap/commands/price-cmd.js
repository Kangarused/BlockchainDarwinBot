"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const CoinMarketCap = require("coinmarketcap-api");
const discord_js_1 = require("discord.js");
const color_utils_1 = require("../../../utilities/color-utils");
const error_cmd_1 = require("./error-cmd");
const variables_1 = require("../core/variables");
class PriceCmd {
    static getCoinPrice(message, coin, convert) {
        var cmcClient = new CoinMarketCap();
        cmcClient.getTicker({
            currency: coin,
            convert: convert
        }).then((ticker) => {
            if (ticker.length > 0) {
                var convertAdd = "";
                if (convert != null) {
                    var upperConvert = convert.toUpperCase();
                    if (this.allowedCurrencies.indexOf(upperConvert) == -1) {
                        error_cmd_1.default.announceError(message.channel, upperConvert + " is not a valid currency ticker.");
                        return;
                    }
                    convertAdd = " in " + upperConvert;
                }
                message.channel.sendEmbed(this.GeneratePriceEmbed(ticker[0], convert));
            }
            else {
                error_cmd_1.default.announceError(message.channel, "Sorry, I wasn't able to find that coin :cry:");
            }
        }).catch((error) => {
            error_cmd_1.default.announceError(message.channel);
        });
    }
    static GeneratePriceEmbed(ticker, convert) {
        var embed = new discord_js_1.RichEmbed();
        var change = ticker.percent_change_24h != null ? ticker.percent_change_24h : 0.0;
        var priceField = "price_usd";
        var emote = "";
        // Determine price field based on convert ticker
        if (convert != null) {
            priceField = `price_${convert.toLowerCase()}`;
            convert = convert.toUpperCase();
        }
        else {
            convert = "USD";
        }
        // If price less than 2 decimal places then do not round
        var price = Number(ticker[priceField]);
        if (price >= 0.01) {
            price = Number(price.toFixed(2));
        }
        // Set color based on 24hr percentage change
        if (change < 0) {
            embed.setColor(color_utils_1.default._red);
            emote = ":fire:";
        }
        else if (change == 0) {
            embed.setColor(color_utils_1.default._gray);
            emote = ":wavy_dash:";
        }
        else {
            embed.setColor(color_utils_1.default._green);
            emote = ":money_with_wings:";
        }
        embed.setTitle(`${emote} ${ticker.name} Price ${emote}`);
        embed.setDescription("Symbol: " + ticker.symbol + "\n" +
            "Rank: " + ticker.rank + "\n" +
            "Price: $" + price + " " + convert + "\n" +
            "Change: " + change + "%");
        embed.setURL(variables_1.default.coinUrl + ticker.id);
        embed.setFooter("Source: Coin Market Cap");
        embed.setTimestamp(moment().toDate());
        return embed;
    }
}
PriceCmd.allowedCurrencies = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];
exports.default = PriceCmd;
//# sourceMappingURL=price-cmd.js.map