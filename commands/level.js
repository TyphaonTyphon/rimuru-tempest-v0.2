const leveling = require('discord-leveling');

module.exports = {
  name: "level",
  description: "level",

async run (client, message, args) {

let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
 
    let output = await leveling.Fetch(user.id)
    message.channel.send(`${user}, seviyen ${output.level} tecrübe puanın ise ${output.xp} xp!`);
    }
    }