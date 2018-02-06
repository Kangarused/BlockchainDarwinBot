import EventService from "../../../services/event-service";
import { Message } from "discord.js";
import ErrorCmd from "../commands/error-cmd";
import EasterEggEvents from "../events/easter-egg-events";

export default class BitconnectModule {
    public static InjectEvents(eventService: EventService) {

        eventService.addEvent<Message>(
            EventService.EventTypes.message,
            /[bB]itconnect/,
            (message: Message) => {
                var lotto = EasterEggEvents.spinWheel();
                if (lotto != -1) {
                    EasterEggEvents.hatchEgg(lotto, message);
                }
            }
        );
    }
}