const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "yazıları ascii yapma komudu",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('Yazı yazmadın!');

        const msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Bir şeyler yanlış gitti');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Lütfen 2000 karakterden kısa bir metin gir!')

            message.channel.send('```' + data + '```')
        })
    }
}