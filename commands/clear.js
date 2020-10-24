module.exports = {
    name: "sil",
    description: "mesaj temizleme",

    async run (client, message, args) {
        if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) {
    return message.channel.send({embed: {color: "RED", description: "Bu komutu kullanamazsın!"}})
    }
    const amount = args.join(" ");

    if(!amount) return message.reply('lütfen sileceğim mesaj sayısını girin!')
      
    if(amount > 100) return message.reply(`100 mesajdan fazla silemezsin!`)

    if(amount < 1) return message.reply(`lütfen pozitif sayı gir!`)

    await message.channel.messages.fetch({limit: amount}).then(messages => {
        message.channel.bulkDelete(messages)
    });

    message.channel.send('Başarılı!')

    }
}