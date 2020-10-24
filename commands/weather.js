const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "hava",
    description: "hava durumu",

    async run (client, message, args){

    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Bölge girmeyi unuttun!')

        if(result === undefined || result.length === 0) return message.channel.send('**Geçersiz** konum');

        var current = result[0].current;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`${current.observationpoint} için hava tahmini`)
        .setThumbnail(current.imageUrl)
        .setColor(0x111111)
        .addField('Saat dilimi', `UTC${location.timezone}`, true)
        .addField('Derece Tipi', 'Celsius', true)
        .addField('Sıcaklık', `${current.temperature}°`, true)
        .addField('Rüzgar', current.winddisplay, true)
        .addField('Hissi', `${current.feelslike}°`, true)
        .addField('Nem', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}