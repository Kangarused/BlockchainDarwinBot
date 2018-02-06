import * as moment from 'moment';
import { GuildMember, RichEmbed } from "discord.js";
import ColorUtils from "../../../utilities/color-utils";

export default class WelcomeCmd {
    public static sendWelcome(member: GuildMember) {
        member.createDM().then((channel) => {
            var content = `Hi ${member.displayName}, please read the information below!\n\n`;
            channel.send(content, this.GenerateWelcomeEmbed());
        });
    }

    public static GenerateWelcomeEmbed() {
        var embed = new RichEmbed();
        embed.setColor(ColorUtils._green);
        embed.setTitle(":rocket: Welcome to Blockchain Darwin! :rocket:");
        embed.setDescription(
            "We are a small community of crypto-traders and enthusiasts \n\u200b\n");

        embed.addField(":question: Got Questions?", 
        "If you have any questions please check out our FAQ channel first! " +
        "If you cant find the answer you're looking for then feel free to request " + 
        "some help in our help channel! \n\u200b\n ");
        
        embed.addField(":money_with_wings: Getting Started...", 
        "If you open the navigation you'll see a number of channels." + 
        "\nYou are free to post in almost all of these channels! \n\u200b\n");

        embed.setFooter("Love from Blockchain Darwin team");
        embed.setTimestamp(moment().toDate());

        return embed;
    }
}