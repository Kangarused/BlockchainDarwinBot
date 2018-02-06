"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const event_service_1 = require("../../../services/event-service");
const event_manager_1 = require("./event-manager");
const welcome_cmd_1 = require("../commands/welcome-cmd");
class Bootstrapper {
    setup(modules) {
        this.client = new Discord.Client();
        this.eventService = new event_service_1.default();
        event_manager_1.default.SetupEvents(this.eventService, modules);
        // Member Join Event - triggers when a new member joins
        this.client.on(event_service_1.default.EventTypes.newMember, (member) => {
            welcome_cmd_1.default.sendWelcome(member);
        });
        // Message Event - triggers when a user posts a message in a channel the bot has access to
        this.client.on(event_service_1.default.EventTypes.message, (message) => {
            if (message.author.bot)
                return;
            var event = this.eventService.getEvent(event_service_1.default.EventTypes.message, message.content);
            if (event != null) {
                event.callback(message);
            }
        });
        // Start discord bot in the main server
        this.client.login("<TOKEN GOES HERE>");
    }
}
exports.default = Bootstrapper;
//# sourceMappingURL=bootstrapper.js.map