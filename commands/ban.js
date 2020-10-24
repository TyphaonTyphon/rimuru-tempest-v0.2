const Discord = require('discord.js');

module.exports = {
    name: "yasak",
    description: "yasaklama komudu",

    async run (client, message, args) {

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Bu komudu kullanamazsın!')
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('Yetkim yok!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.channel.send('Birini etiketlemeyi unuttun!');

        if(!member) return message.channel.send('Böyle biri yok! :/');
        if(!member.bannable) return message.channel.send('Bu kullanıcı yasaklanamaz. Yönetici oldukları için ya da rolleri seninkinden daha yüksek!');

        if(member.id === message.author.id) return message.channel.send('Bruh, kendini yasaklayamazsın!');

        let reason = args.slice(1).join(" ");

        if(reason === undefined) reason = 'Sebep belirtilmemiş!';

        member 
          .ban({reason})
        .catch(err => {
            if(err) return message.channel.send('Yanlış giden bir şeyler var.')
        })

        const banembed = new Discord.MessageEmbed()
        .setTitle('Yasaklandı')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('Kullanıcı yasaklandı', member)
        .addField('Yasaklayan Admin', message.author)
        .addField('Sebebi', reason)
        .setFooter('Yasaklandığı zaman', client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);


    }
}