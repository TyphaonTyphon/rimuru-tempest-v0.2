const pagination = require('discord.js-pagination');
const Discord = require('discord.js');

module.exports = {
    name: "yardım",
    description: "yardım komutu",

    async run (client, message, args){

        //Sort your commands into categories, and make seperate embeds for each category

        const moderation = new Discord.MessageEmbed()
        .setTitle('Moderasyon Komutları')
        .addField('`rat`', 'Seçilmiş üyeyi atar.')
        .addField('`ryasak`', 'Seçilmiş üyeyi yasaklar.')
        .addField('`rsil`', 'Mesajları siler.')
        .addField('`yaz`', 'Yazdığın yazıyı kendisi tekrar yazar.')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Eğlence Komutları')
        .addField('`rmeme`', "Reddit'ten meme getirir." )
        .addField('`rascii`', 'Yazıları ASCII sistemiyle yeniden yazar.')
        .setTimestamp()

        const utility = new Discord.MessageEmbed()
        .setTitle('Faydalı Komutlar')
        .addField('`rping`', 'Botun API pingini alın.')
        .addField('`rhesap`', 'Matematik hesapları yapar.')
        .addField('`rhava`', 'Konum için hava tahminini denetler.')
        .setTimestamp()

        const pages = [
                moderation,
                fun,
                utility
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '120000';

        pagination(message, pages, emojiList, timeout)
    }
}