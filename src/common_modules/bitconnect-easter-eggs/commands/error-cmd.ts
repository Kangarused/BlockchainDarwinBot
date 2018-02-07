import * as moment from 'moment';
import { GuildMember, RichEmbed, TextChannel, DMChannel, GroupDMChannel } from "discord.js";

export default class ErrorCmd {
    public static announceError(channel: TextChannel | DMChannel | GroupDMChannel, message?: string) {
        var error = message != null ? message : "Whoops, something went wrong.";
        channel.sendMessage(error);
    }
}