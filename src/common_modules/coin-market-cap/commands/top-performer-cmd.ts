import * as moment from 'moment';
import * as CoinMarketCap from 'coinmarketcap-api';
import { GuildMember, RichEmbed, Message } from "discord.js";
import ColorUtils from "../../../utilities/color-utils";
import ErrorCmd from './error-cmd';
import Variables from '../core/variables';

export default class TopPerformerCmd {
    public static defaultSearchNo: number = 100;

    public static getTopPerformer(
        message: Message, 
        input: string, 
        timeframe?: string
    ) {
        var mode = this.validateInput(input);
        // Format: !top performer 100 <timeframe>
        if (mode == 1) {
            this.getCoinsFromNumber(Number(input)).then((response) => {
                if (response.success) {
                    if (timeframe != null && this.validateInput(timeframe) == 2) {
                        this.getTopCoin(message, response.results, timeframe);
                    } else {
                        this.getTopCoin(message, response.results);
                    }
                } else {
                    ErrorCmd.announceError(message.channel, response.error);
                }
            });
            
        } 
        // Format: !top performer 24h
        else if (mode == 2) {
            this.getCoinsFromNumber(this.defaultSearchNo).then((response) => {
                if (response.success) {
                    this.getTopCoin(message, response.results, input);
                } else {
                    ErrorCmd.announceError(message.channel, response.error);
                }
            });
        } else {
            // Illegal Entry
            ErrorCmd.announceError(message.channel, "I didn't understand that :cry:");
        }
    }

    private static validateInput(input: string) {
        if (/^[0-9]+$/.test(input)) {
            return 1;
        } else if (input == '1h' || input == '24h' || input == '7d') {
            return 2;
        } else {
            return -1;
        }
    }

    private static getCoinsFromNumber(limit: number): Promise<{success: boolean, results: ICoinMarketCap.Ticker[], error: string}> {
        return new Promise((resolve, reject) => {
            var cmcClient: ICoinMarketCap.Client = new CoinMarketCap();
            cmcClient.getTicker({
                start: 0,
                limit: limit
            }).then((ticker) => {
                resolve({success: true, results: ticker, error: null});
            }).catch((error) => {
                resolve({success: false, error: "I couldn't find what you wanted :cry:", results: null});
            });
        });
    }

    private static getTopCoin(message: Message, coins: ICoinMarketCap.Ticker[], timeframe: string = '24h'): void {
        if (coins.length > 1) {
            var field = "percent_change_"+timeframe;
            coins.sort((a, b) => {
                if (a[field] > b[field]) {
                    return -1;
                } else if (a[field] < b[field]) {
                    return 1;
                } 
                return 0;
            });
            var embed = this.GenerateEmbed(coins[0], timeframe);
            message.channel.sendEmbed(embed);
        } else {
            ErrorCmd.announceError(message.channel, "Hmm, something went wrong :flushed:");
        }
    }

    public static GenerateEmbed(ticker: ICoinMarketCap.Ticker, timeframe: string): RichEmbed {
        var embed = new RichEmbed();
        var change = ticker.percent_change_24h != null ? ticker.percent_change_24h : 0.0;
        var emote = ":military_medal:";

        // If price less than 2 decimal places then do not round
        var price = Number(ticker.price_usd);
        if (price >= 0.01) {
            price = Number(price.toFixed(2));
        }

        embed.setColor(ColorUtils._gold);
        embed.setTitle(`${emote} Winner is ${ticker.name} ${emote}`);
        embed.setDescription(
            "Symbol: " + ticker.symbol + "\n" +
            "Rank: " + ticker.rank + "\n" +
            "Price: $" + price + " USD" + "\n" +
            timeframe + " Change: " + change + "%"
        );
        embed.setURL(Variables.coinUrl+ticker.id);

        embed.setFooter("Source: Coin Market Cap");
        embed.setTimestamp(moment().toDate());

        return embed;
    }
}