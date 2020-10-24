const fetch = require('node-fetch');

const Discord = require('discord.js');

module.exports = {
    name: "covid",
    description: "korona komutu",

    async run (client, message, args){

        let countries = args.join(" ");

        //Credit to Sarastro#7725 for the command :)

        const noArgs = new Discord.MessageEmbed()
        .setTitle('Eksik komut')
        .setColor(0xFF0000)
        .setDescription('Ülke seçmeyi unuttun! (ör: rcovid all veya rcovid Canada)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Dünya Çapında COVID-19 İstatistikleri 🌎`)
                .addField('Onaylı Vakalar', confirmed)
                .addField('İyileşmiş', recovered)
                .addField('Ölümler', deaths)

                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 **${countries}** İstatistikleri`)
                .addField('Onaylı Vakalar', confirmed)
                .addField('İyileşmiş', recovered)
                .addField('Ölümler', deaths)

                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('Böyle bir ülke yok!')
            })
        }
    }
}