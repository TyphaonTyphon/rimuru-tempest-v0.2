const Discord = require('discord.js');
const client = new Discord.Client();
const { token } = require('./config.json');
const { readdirSync } = require('fs');
const { join } = require('path');
const leveling = require('discord-leveling');

client.commands= new Discord.Collection();

const prefix = 'r';

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

var oynuyorkısımları = [
"ryardım",
"Rimuru Bot",
"by TyphaonTyphon"
]
client.on("error", console.error);

client.on('ready', () => {
    console.log('Rimuru Tempest Göreve Hazır');
    client.user.setStatus(`idle`)
    client.channels.cache.get('756135903013109780').startTyping();
    client.channels.cache.get('767082780605546606').join();
    setInterval(function() {
        var random = Math.floor(Math.random()*(oynuyorkısımları.length-0+1)+0);
       client.user.setActivity(oynuyorkısımları[random], { type: 'PLAYING' });
        }, 2 * 3000)});

let stats = {
    serverID: '755210448953147493',
    total: "766990653636345887",
    member: "766990734900723722",
    bots: "766990760020803594"
}

client.on('guildMemberAdd', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Toplam: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Üyeler: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Botlar: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    const kayıtsız = member.guild.roles.cache.find(r => r.name === "Kayıtsız");
    member.roles.add(kayıtsız)
    const total = member.guild.memberCount;
    const channel = member.guild.channels.cache.find(ch => ch.name === '｢✅｣üye-kayıt');
    const katılma = member.user.createdAt;
    const channel0 = member.guild.channels.cache.find(ch => ch.name === '｢🗝｣gelen-giden');
    const channel1 = member.guild.channels.cache.find(ch => ch.name === '｢✏｣genel-sohbet');
    if (!channel) return;
    channel.send(`
Merhaba, sunucumuza hoşgeldin! ${member}, seninle beraber ${total} kişi olduk.
Kaydının yapılması için kayıt odalarına girip ses teyit vermen yeterli olacaktır.
Kayıt olmak için <@&755216507658567740> rolünü etiketle müsait adminler ilgilenecektir.
Hesabın Açıldığı Gün: ${katılma}
`);
  channel1.send(`Ailemize Hoşgeldin ${member}`)
  channel0.send(`${member} sunucuya giriş yaptı.`)
});

client.on('guildMemberRemove', member => {
    if(member.guild.id !== stats.serverID) return;
    client.channels.cache.get(stats.total).setName(`Toplam: ${member.guild.memberCount}`);
    client.channels.cache.get(stats.member).setName(`Üyeler: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(stats.bots).setName(`Botlar: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    const channel0 = member.guild.channels.cache.find(ch => ch.name === '｢🗝｣gelen-giden');
    const channel1 = member.guild.channels.cache.find(ch => ch.name === '｢✏｣genel-sohbet');
    channel1.send(`Seni Özleyeceğiz. ${member}`)
    channel0.send(`${member} sunucudan ayrıldı.`)
})

client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
  
    let profile = await leveling.Fetch(message.author.id);
    leveling.AddXp(message.author.id, 15);

    if(profile.xp + 15 > 150){
        leveling.AddLevel(message.author.id, 1);
        leveling.SetXp(message.author.id, 0)
        message.reply(`TEBRİKLER! ${profile.level + 1} seviye oldun!`)
    }

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(!client.commands.has(command)) return;
        try {
            client.commands.get(command).run(client, message, args);
        } catch (error){
            console.error(error);
        }
    }
})
  
client.login(token);
