"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const CoinMarketCap = require("coinmarketcap-api");
const discord_js_1 = require("discord.js");
const error_cmd_1 = require("./error-cmd");
const variables_1 = require("../core/variables");
class WorstPerformerCmd {
    static getWorstPerformer(message, input, timeframe) {
        var mode = this.validateInput(input);
        // Format: !top performer 100 <timeframe>
        if (mode == 1) {
            this.getCoinsFromNumber(Number(input)).then((response) => {
                if (response.success) {
                    if (timeframe != null && this.validateInput(timeframe) == 2) {
                        this.getWorstCoin(message, response.results, timeframe);
                    }
                    else {
                        this.getWorstCoin(message, response.results);
                    }
                }
                else {
                    error_cmd_1.default.announceError(message.channel, response.error);
                }
            });
        }
        else if (mode == 2) {
            this.getCoinsFromNumber(this.defaultSearchNo).then((response) => {
                if (response.success) {
                    this.getWorstCoin(message, response.results, input);
                }
                else {
                    error_cmd_1.default.announceError(message.channel, response.error);
                }
            });
        }
        else {
            // Illegal Entry
            error_cmd_1.default.announceError(message.channel, "I didn't understand that :cry:");
        }
    }
    static validateInput(input) {
        if (/^[0-9]+$/.test(input)) {
            return 1;
        }
        else if (input == '1h' || input == '24h' || input == '7d') {
            return 2;
        }
        else {
            return -1;
        }
    }
    static getCoinsFromNumber(limit) {
        return new Promise((resolve, reject) => {
            var cmcClient = new CoinMarketCap();
            cmcClient.getTicker({
                start: 0,
                limit: limit
            }).then((ticker) => {
                resolve({ success: true, results: ticker, error: null });
            }).catch((error) => {
                resolve({ success: false, error: "I couldn't find what you wanted :cry:", results: null });
            });
        });
    }
    static getWorstCoin(message, coins, timeframe = '24h') {
        if (coins.length > 1) {
            var field = "percent_change_" + timeframe;
            coins.sort((a, b) => {
                if (a[field] < b[field]) {
                    return -1;
                }
                else if (a[field] > b[field]) {
                    return 1;
                }
                return 0;
            });
            var embed = this.GenerateEmbed(coins[0], timeframe);
            message.channel.sendEmbed(embed);
        }
        else {
            error_cmd_1.default.announceError(message.channel, "Hmm, something went wrong :flushed:");
        }
    }
    static GenerateEmbed(ticker, timeframe) {
        var embed = new discord_js_1.RichEmbed();
        var change = ticker.percent_change_24h != null ? ticker.percent_change_24h : 0.0;
        var emote = ":poop:";
        // If price less than 2 decimal places then do not round
        var price = Number(ticker.price_usd);
        if (price >= 0.01) {
            price = Number(price.toFixed(2));
        }
        embed.setColor(this._brown);
        embed.setTitle(`${emote} Loser is ${ticker.name} ${emote}`);
        embed.setDescription("Symbol: " + ticker.symbol + "\n" +
            "Rank: " + ticker.rank + "\n" +
            "Price: $" + price + " USD" + "\n" +
            timeframe + " Change: " + change + "%");
        embed.setURL(variables_1.default.coinUrl + ticker.id);
        embed.setFooter("Source: Coin Market Cap");
        embed.setTimestamp(moment().toDate());
        return embed;
    }
}
WorstPerformerCmd.defaultSearchNo = 100;
WorstPerformerCmd._brown = "#96592d";
exports.default = WorstPerformerCmd;
//# sourceMappingURL=worst-performer-cmd.js.map