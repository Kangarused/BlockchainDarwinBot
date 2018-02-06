import EventService from "../../../services/event-service";
import { Message } from "discord.js";
import HelpCmd from "../commands/help-cmd";
import WelcomeCmd from "../commands/welcome-cmd";
import ErrorCmd from "../commands/error-cmd";

export default class EventManager {
    public static SetupEvents(eventService: EventService, modules?: any[]) {
        eventService.addTrigger<Message>(
            EventService.EventTypes.message,
            "View Help / Bot Commands",
            ">Help",
            "I will message you with a list of commands that he listens for.",
            /^([>!][hH]elp)$/,
            (message: Message) => {
                var events = eventService.getEventsByType(EventService.EventTypes.message);
                HelpCmd.sendHelp(message.member, events);
            }
        );

        eventService.addTrigger<Message>(
            EventService.EventTypes.message,
            "Welcome Me",
            ">Welcome Me",
            "I will send you the welcome message.",
            /^([>!][wW]elcome [mM]e)$/,
            (message: Message) => {
                WelcomeCmd.sendWelcome(message.member);
            }
        );

        eventService.addTrigger<Message>(
            EventService.EventTypes.message,
            "Welcome Someone",
            ">Welcome @<username>",
            "I will send the welcome message to the user you specify.",
            /^([>!][wW]elcome <@)+[0-9]+(>)$/,
            (message: Message) => {
                // We know message should look like this: >Welcome <@id>, so split string at @
                var components = message.content.split('@');
                if (components.length == 2) {
                    // Remove last character which will be '>'
                    components[1] = components[1].slice(0, -1);

                    // Fetch member with that id and send them the welcome message
                    message.guild.fetchMember(components[1]).then((member) => {
                        WelcomeCmd.sendWelcome(member);
                    }).catch((exception) => {
                        ErrorCmd.announceError(message.channel, "I couldn't find that user :cry:");
                    });
                } else {
                    ErrorCmd.announceError(message.channel);
                }
            }
        );

        // Attach custom modules
        modules.forEach((module: App.IModule) => {
            module.InjectEvents(eventService);
        });
    }
}