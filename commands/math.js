const math = require('mathjs');

const Discord = require('discord.js');

module.exports = {
    name: "hesap",
    description: "matematik",


    async run (client, message, args){

        if(!args[0]) return message.channel.send('Lütfen bir soru girin!');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('Lütfen **geçerli** bir soru girin')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(0x808080)
        .setTitle('Hesap Makinesi')
        .addField('Soru: ', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Cevap: ', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}