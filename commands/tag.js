const Discord = require('discord.js')

module.exports = {
    name: "tag-yetki",
    description: "meme makinesi",
  async run (client, message, args) {
  
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);
  
  const tag = `λ`
  const memberss = message.guild.members.cache.filter(member => member.user.username.includes(tag));
  const rol = message.guild.roles.cache.find(r => r.name === "λ | Taglı Üye");
  const kayıt = new Discord.MessageEmbed()
	.setColor('GREEN')
	.setTitle('KOMUT ÇALIŞTI')
	.addFields(
		{ name: `Taglı kişilere rol verildi.`, inline: false },
	)
message.channel.send(kayıt);
  message.guild.members.cache.forEach(u => {
    if(u.user.username.includes(tag)) {
      u.roles.add(rol.id)
    }
  });
}}
