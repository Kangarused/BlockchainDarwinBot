"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_service_1 = require("../../../services/event-service");
const help_cmd_1 = require("../commands/help-cmd");
const welcome_cmd_1 = require("../commands/welcome-cmd");
const error_cmd_1 = require("../commands/error-cmd");
class EventManager {
    static SetupEvents(eventService, modules) {
        eventService.addTrigger(event_service_1.default.EventTypes.message, "View Help / Bot Commands", ">Help", "I will message you with a list of commands that he listens for.", /^([>!][hH]elp)$/, (message) => {
            var events = eventService.getEventsByType(event_service_1.default.EventTypes.message);
            help_cmd_1.default.sendHelp(message.member, events);
        });
        eventService.addTrigger(event_service_1.default.EventTypes.message, "Welcome Me", ">Welcome Me", "I will send you the welcome message.", /^([>!][wW]elcome [mM]e)$/, (message) => {
            welcome_cmd_1.default.sendWelcome(message.member);
        });
        eventService.addTrigger(event_service_1.default.EventTypes.message, "Welcome Someone", ">Welcome @<username>", "I will send the welcome message to the user you specify.", /^([>!][wW]elcome <@)+[0-9]+(>)$/, (message) => {
            // We know message should look like this: >Welcome <@id>, so split string at @
            var components = message.content.split('@');
            if (components.length == 2) {
                // Remove last character which will be '>'
                components[1] = components[1].slice(0, -1);
                // Fetch member with that id and send them the welcome message
                message.guild.fetchMember(components[1]).then((member) => {
                    welcome_cmd_1.default.sendWelcome(member);
                }).catch((exception) => {
                    error_cmd_1.default.announceError(message.channel, "I couldn't find that user :cry:");
                });
            }
            else {
                error_cmd_1.default.announceError(message.channel);
            }
        });
        // Attach custom modules
        modules.forEach((module) => {
            module.InjectEvents(eventService);
        });
    }
}
exports.default = EventManager;
//# sourceMappingURL=event-manager.js.map