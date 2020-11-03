const Discord = require("discord.js");
module.exports = {
    name: "kayıtk",
    description: "kayıt komutu",

    async run (client, message, args){
    let allowedRole = message.guild.roles.find("↺ | Teyit Sorumlusu");
    if (!message.member.roles.has(allowedRole.id)) {
    return message.channel.send({embed: {color: "RED", description: "Bu komutu kullanamazsın!"}})
    }
    const user = message.mentions.users.first();
    const tag = ("λ")
    const isim = args.slice(1).join(" | ");
    const yenisim = `${tag} ${isim}`;
    const member = message.guild.members.cache.get(user.id);
    await member.setNickname(yenisim);
    const kayıtsız = member.guild.roles.cache.find(r => r.name === "Kayıtsız");
    member.roles.remove(kayıtsız)
    const üye = member.guild.roles.cache.find(r => r.name === "λ | Üye");
    member.roles.add(üye)
    const cins = member.guild.roles.cache.find(r => r.name === "λ | Kadın");
    member.roles.add(cins)
    const kayıt = new Discord.MessageEmbed()
	.setColor('GREEN')
	.setTitle('KAYIT BAŞARILI')
	.addFields(
		{ name: `Kayıt edilen:`, value:`${user}`, inline: true },
		{ name: `Kayıt eden:`, value:`${message.author}`, inline: true },
	)
message.channel.send(kayıt);
    }}
