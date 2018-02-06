"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const discord_js_1 = require("discord.js");
const color_utils_1 = require("../../../utilities/color-utils");
class HelpCmd {
    static sendHelp(member, events) {
        member.createDM().then((channel) => {
            var content = `Hi ${member.displayName}, you requested some help!\n\n`;
            channel.send(content, this.GenerateHelpEmbed(events));
        });
    }
    static GenerateHelpEmbed(events) {
        var embed = new discord_js_1.RichEmbed();
        embed.setColor(color_utils_1.default._lightBlue);
        embed.setTitle(":large_blue_diamond: Blockchain Darwin Bot Help Centre! :large_blue_diamond:");
        embed.setDescription("See below for a list of commands that I will respond to! \n" +
            "Just type the 'Trigger' in any channel that I have access to and I'll do the rest!\n\u200b\n" +
            "You can initiate a command using either > or !. For example:\n```>Help\n!Help```\n\u200b\n");
        var content = "";
        events.forEach((event) => {
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
exports.default = HelpCmd;
//# sourceMappingURL=help-cmd.js.map