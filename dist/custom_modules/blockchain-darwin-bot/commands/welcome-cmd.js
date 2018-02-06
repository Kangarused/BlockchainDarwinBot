"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const discord_js_1 = require("discord.js");
const color_utils_1 = require("../../../utilities/color-utils");
class WelcomeCmd {
    static sendWelcome(member) {
        member.createDM().then((channel) => {
            var content = `Hi ${member.displayName}, please read the information below!\n\n`;
            channel.send(content, this.GenerateWelcomeEmbed());
        });
    }
    static GenerateWelcomeEmbed() {
        var embed = new discord_js_1.RichEmbed();
        embed.setColor(color_utils_1.default._green);
        embed.setTitle(":rocket: Welcome to Blockchain Darwin! :rocket:");
        embed.setDescription("We are a small community of crypto-traders and enthusiasts \n\u200b\n");
        embed.addField(":question: Got Questions?", "If you have any questions please check out our FAQ channel first! " +
            "If you cant find the answer you're looking for then feel free to request " +
            "some help in our help channel! \n\u200b\n ");
        embed.addField(":money_with_wings: Getting Started...", "If you open the navigation you'll see a number of channels." +
            "\nYou are free to post in almost all of these channels! \n\u200b\n");
        embed.setFooter("Love from Blockchain Darwin team");
        embed.setTimestamp(moment().toDate());
        return embed;
    }
}
exports.default = WelcomeCmd;
//# sourceMappingURL=welcome-cmd.js.map