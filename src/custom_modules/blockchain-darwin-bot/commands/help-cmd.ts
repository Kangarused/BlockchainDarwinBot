import * as moment from 'moment';
import { GuildMember, RichEmbed } from "discord.js";
import EventModel from '../../../classes/event-model';

export default class HelpCmd {
    public static _lightBlue = "#42a7f4";

    public static sendHelp(member: GuildMember, events: EventModel<any>[]) {
        member.createDM().then((channel) => {
            var content = `Hi ${member.displayName}, you requested some help!\n\n`;
            channel.send(content, this.GenerateHelpEmbed(events));
        });
    }

    public static GenerateHelpEmbed(events: EventModel<any>[]) {
        var embed = new RichEmbed();
        embed.setColor(this._lightBlue);
        embed.setTitle(":large_blue_diamond: Blockchain Darwin Bot Help Centre! :large_blue_diamond:");
        embed.setDescription(
            "See below for a list of commands that I will respond to! \n" +
            "Just type the 'Trigger' in any channel that I have access to and I'll do the rest!\n\u200b\n" +
            "You can initiate a command using either > or !. For example:\n```>Help\n!Help```\n\u200b\n"
        );

        var content = "";
        events.forEach((event: EventModel<any>) => {
            if (event.showHelp) {
                var content = event.description + "\n";
                content += "*Trigger:* ```" + event.trigger + "```\n\u200b\n";
                embed.addField(event.name, content);
            }
        });

        embed.setFooter("Love from Blockchain Darwin team");
        embed.setTimestamp(moment().toDate());

        return embed;
    }
}