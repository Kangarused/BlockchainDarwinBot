import * as Discord from 'discord.js';
import EventService from '../../../services/event-service';
import EventManager from './event-manager';
import WelcomeCmd from '../commands/welcome-cmd';
import { GuildMember, Message } from 'discord.js';

export default class Bootstrapper {

    public client: Discord.Client;
    public eventService: EventService;

    public setup(modules?: App.IModule[]) {
        this.client = new Discord.Client();
        this.eventService = new EventService();

        EventManager.SetupEvents(this.eventService, modules);

        // Member Join Event - triggers when a new member joins
        this.client.on(EventService.EventTypes.newMember, (member: GuildMember) => {
            WelcomeCmd.sendWelcome(member);
        });

        // Message Event - triggers when a user posts a message in a channel the bot has access to
        this.client.on(EventService.EventTypes.message, (message: Message) => {
            if (message.author.bot) return;
            var event = this.eventService.getEvent<Message>(EventService.EventTypes.message, message.content);
            if (event != null) {
                event.callback(message);
            }
        });

        // Start discord bot in the main server
        this.client.login("<TOKEN GOES HERE>");
    }
}