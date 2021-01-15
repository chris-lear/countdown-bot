const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();

client.login(config.BOT_TOKEN);

client.on("message", function(message) {
    if (message.content=='BOMB') {
        message.guild.members.fetch(message.author).then(member => {
            if (member.voice.channel) {
                member.voice.channel.join().then( (connection) => {
                    loop(connection, Math.random()*50000+10000);
                });
            }
        });
    }
});

var timer;

function loop(connection, time) {
    const dispatcher = connection.play('./clock-ticking-4.mp3');
    if (!timer) {
        timer = setTimeout(() => {
            dispatcher.pause();
            connection.play('./explosion.mp3');
            timer = null;
        }, time);
    }
    dispatcher.setVolume(1);
    dispatcher.on('finish', () => {
        console.log('looping');
        loop(connection);
    });
}
