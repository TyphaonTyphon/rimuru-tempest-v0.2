const { MessageFlags } = require("discord.js");

module.exports = {
    name: "yaz",
    desciption: "yaz komudu",

    async run (client, message, args) {
        if (!message.member.hasPermission(["MANAGE_GUILD", "ADMINISTRATOR"])) {
        return message.channel.send({embed: {color: "RED", description: "Bu komutu kullanamazsın!"}})
        }
        let msg;
        let textChannel = message.mentions.channels.first()
        message.delete()

        if(textChannel) {
            msg = args.slice(1).join(" ");
            textChannel.send(msg)
        } else {
            msg = args.join(" ");
            message.channel.send(msg)
        }
    }
}