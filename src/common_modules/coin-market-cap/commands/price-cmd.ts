import * as moment from 'moment';
import * as CoinMarketCap from 'coinmarketcap-api';
import { GuildMember, RichEmbed, Message } from "discord.js";
import ColorUtils from "../../../utilities/color-utils";
import ErrorCmd from './error-cmd';

export default class PriceCmd {
    public static allowedCurrencies = ["AUD", "BRL", "CAD", "CHF", "CLP", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF", "IDR", "ILS", "INR", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PKR", "PLN", "RUB", "SEK", "SGD", "THB", "TRY", "TWD", "ZAR"];

    public static getCoinPrice(
        message: Message, 
        coin: string, 
        convert?: string
    ) {
        var cmcClient: ICoinMarketCap.Client = new CoinMarketCap();
        cmcClient.getTicker({
            currency: coin,
            convert: convert
        }).then((ticker) => {
            if (ticker.length > 0) {
                var convertAdd = "";
                if (convert != null) {
                    var upperConvert = convert.toUpperCase();
                    if (this.allowedCurrencies.indexOf(upperConvert) == -1) {
                        ErrorCmd.announceError(message.channel, upperConvert + " is not a valid currency ticker.");
                        return;
                    }
                    convertAdd = " in " + upperConvert;
                }
                var content = `Hi ${message.member.displayName}, you requested the ${ticker[0].name} price${convertAdd}!\n\n`;
                message.channel.send(content, this.GeneratePriceEmbed(ticker[0], convert));
            } else {
                ErrorCmd.announceError(message.channel, "Sorry, I wasn't able to find that coin :cry:");
            }
        }).catch((error) => {
            ErrorCmd.announceError(message.channel);
        });
    }

    public static GeneratePriceEmbed(ticker: ICoinMarketCap.Ticker, convert?: string) {
        var embed = new RichEmbed();
        var change = ticker.percent_change_24h != null ? ticker.percent_change_24h : 0.0;
        var priceField = "price_usd";
        var emote = "";

        // Determine price field based on convert ticker
        if (convert != null) {
            priceField = `price_${convert.toLowerCase()}`;
            convert = convert.toUpperCase();
        } else {
            convert = "USD";
        }

        // If price less than 2 decimal places then do not round
        var price = Number(ticker[priceField]);
        if (price >= 0.01) {
            price = Number(price.toFixed(2));
        }

        // Set color based on 24hr percentage change
        if (change < 0) {
            embed.setColor(ColorUtils._red);
            emote = ":fire:";
        } else if (change == 0) {
            embed.setColor(ColorUtils._gray);
            emote = ":wavy_dash:";
        } else { 
            embed.setColor(ColorUtils._green);
            emote = ":money_with_wings:";
        }

        embed.setTitle(`${emote} ${ticker.name} Price ${emote}`);
        embed.setDescription(
            "Symbol: " + ticker.symbol + "\n" +
            "Rank: " + ticker.rank + "\n" +
            "Price: $" + price + " " + convert + "\n" +
            "Change: " + change + "%"
        );

        embed.setFooter("Prices sourced from Coin Market Cap");
        embed.setTimestamp(moment().toDate());

        return embed;
    }
}