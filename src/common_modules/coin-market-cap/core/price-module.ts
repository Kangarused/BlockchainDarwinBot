import EventService from "../../../services/event-service";
import { Message } from "discord.js";
import PriceCmd from "../commands/price-cmd";
import ErrorCmd from "../commands/error-cmd";
import TopPerformerCmd from "../commands/top-performer-cmd";
import WorstPerformerCmd from "../commands/worst-performer-cmd";

export default class PriceModule {
    public static InjectEvents(eventService: EventService) {
        eventService.addTrigger<Message>(
            EventService.EventTypes.message,
            "Get Coin Price",
            ">Price <coin name>\n>Price <coin name> <currency ticker>\n>price power-ledger aud",
            "I will check coinmarketcap for the latest price of the specified coin. " + 
            "You can also add a currency ticker to the end to have the price shown in your preferred currency! \n\u200b\n" +
            "Available currency tickers are:\n" + PriceCmd.allowedCurrencies.join(', ') + "\n\u200b\n",
            /^([>!][pP]rice )+(.*)$/,
            (message: Message) => {
                var content = message.content.substr(7);
                var components = content.split(' ');

                if (components.length >= 2) {
                    PriceCmd.getCoinPrice(message, components[0], components[1].toUpperCase());
                } else if (components.length == 1) {
                    PriceCmd.getCoinPrice(message, components[0]);
                } else {
                    ErrorCmd.announceError(message.channel);
                }
            }
        );

        eventService.addTrigger<Message>(
            EventService.EventTypes.message,
            "Get Top Performer",
            ">top performer <# of coins to include>\n>top performer <# of coins to include> <timeframe (1h, 24h, 7d)>\n>top performer 24h\n!top performer 100 24h",
            "I will check coinmarketcap starting from the #1 spot and working my way down for the number of coins you instructed me to include " + 
            "and I will identify the coin that has performed the best within the timeframe you have specified! \n\u200b\n",
            /^([>!][tT]op [pP]erformer )(.{1,3})( )?(([0-9]{1,2})[hd])?$/,
            (message: Message) => {
                var content = message.content.toLowerCase().substr(15);
                var components = content.split(' ');

                if (components.length >= 2) {
                    TopPerformerCmd.getTopPerformer(message, components[0], components[1]);
                } else if (components.length == 1) {
                    TopPerformerCmd.getTopPerformer(message, components[0]);
                } else {
                    ErrorCmd.announceError(message.channel);
                }
            }
        );

        eventService.addTrigger<Message>(
            EventService.EventTypes.message,
            "Get Worst Performer",
            ">worst performer <# of coins to include>\n>worst performer <# of coins to include> <timeframe (1h, 24h, 7d)>\n>worst performer 24h\n!worst performer 100 24h",
            "I will check coinmarketcap starting from the #1 spot and working my way down for the number of coins you instructed me to include " + 
            "and I will identify the coin that has performed the worst within the timeframe you have specified! \n\u200b\n",
            /^([>!][wW]orst [pP]erformer )(.{1,3})( )?(([0-9]{1,2})[hd])?$/,
            (message: Message) => {
                var content = message.content.toLowerCase().substr(17);
                var components = content.split(' ');

                if (components.length >= 2) {
                    WorstPerformerCmd.getWorstPerformer(message, components[0], components[1]);
                } else if (components.length == 1) {
                    WorstPerformerCmd.getWorstPerformer(message, components[0]);
                } else {
                    ErrorCmd.announceError(message.channel);
                }
            }
        );
    }
}