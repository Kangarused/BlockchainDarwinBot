import * as CoinMarketCap from 'coinmarketcap-api';
import * as fs from 'fs';
import * as path from 'path';
import { Message } from "discord.js";
import ErrorCmd from '../commands/error-cmd';

export default class EasterEggEvents {
    public static spinWheel() {
        var random = Math.random();
        var spin =  random * 100;
        if (spin > 15 && spin < 30) {
            return 1;
        } else if (spin > 50 && spin < 70) {
            return 2;
        } else {
            return -1;
        }
    }

    public static hatchEgg(variant: number, message: Message) {
        switch(variant) {
            case 1:
                message.channel.send("BiitConnneeeEEEEEEEEeeeeEEeeEEEeeeeeccccTtttttTtt!");
                break;
            case 2:
                var cmcClient: ICoinMarketCap.Client = new CoinMarketCap();
                cmcClient.getTicker({currency: "bitconnect"}).then((ticker) => {
                    if (ticker.length > 0) {
                        var content;
                        var bcc = ticker[0];
                        if (Number(bcc.price_usd) < 10) {
                            content = `${bcc.name} price is $${bcc.price_usd}! HAHAAHAHAHHAAHA\n\n`;
                        } else {
                            content = `${bcc.name} price is $${bcc.price_usd}! HA-wait what!?\n\n`;
                        }
                        message.channel.send(content);
                    }
                }).catch((error) => {
                    console.log(error);
                });
                break;
        }
    }
}