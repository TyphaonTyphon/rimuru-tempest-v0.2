const Discord = require('discord.js');

module.exports = {
    name: "at",
    description: "atma komudu",

    async run (client, message, args) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Bu komudu kullanamazsın!')
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('Yetkim yok!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Birini etiketlemeyi unuttun!');

        if(!member) return message.channel.send('Böyle biri yok! :/');
        if(!member.kickable) return message.channel.send('Bu kullanıcı atılamaz. Yönetici oldukları için ya da rolleri seninkinden daha yüksek!');

        if(member.id === message.author.id) return message.channel.send('Bruh, kendini atamazsın!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Sebep belirtilmemiş!';

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Yanlış giden bir şeyler var.')
        })

        const kickembed = new Discord.MessageEmbed()
        .setTitle('Atıldı')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Kullanıcı atıldı', member)
        .addField('Atan Admin', message.author)
        .addField('Sebebi', reason)
        .setFooter('Atıldığı zaman', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(kickembed);


    }
}