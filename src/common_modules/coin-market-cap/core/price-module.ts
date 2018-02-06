import EventService from "../../../services/event-service";
import { Message } from "discord.js";
import PriceCmd from "../commands/price-cmd";
import ErrorCmd from "../commands/error-cmd";

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
    }
}