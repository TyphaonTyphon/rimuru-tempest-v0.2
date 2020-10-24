const canva = require('canvacord');
const Discord = require('discord.js')

module.exports = {
    name: "color",
    description: "renk",


    async run (client, message, args) {

        let colorOfChoice = args.join(" ");

        if(!args[0]) return message.channel.send('Provide a valid HEX code (#FF0000)');

        let image = await canva.Canvas.color(`#${colorOfChoice}`)

        let color = new Discord.MessageAttachment(image, "color.png")

        message.channel.send(color);
    }
}