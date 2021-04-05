const Discord = require('discord.js'); 
var request = require('request');
const db = require('wio.db')
exports.run = async(client, msg, args) => {
 
 if (msg.channel.type !== "text") return;
  
const limit = args[0];
  
  if(!limit) {
              var embed = new Discord.MessageEmbed()
                .setDescription("**<:Beklemede:818050135330258965> Doğru kullanım:**`**s!yavaş-mod [0-∞]**`")
              .setColor("YELLOW")
              msg.channel.send({embed: embed})
            return
          }
  
if (isNaN(limit)) {
  var s = new Discord.MessageEmbed()
  .setDescription("**<:Beklemede:818050135330258965> Doğru kullanım:**`**s!yavaş-mod [0-∞]**`")
  .setColor("YELLOW")
  msg.channel.send({embed: s});
    return
}
  
if (limit > 300) {
  var x = new Discord.MessageEmbed()

    var es = new Discord.MessageEmbed()
    .setDescription(`**<:Beklemede:818050135330258965> Yazma süre limiti ${limit} Saniye olarak ayarlanmıştır**`)
    .setColor("YELLOW")
    msg.channel.send({embed: es})
  

request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})
    return
}
    var e = new Discord.MessageEmbed()
    .setDescription(`**<:Beklemede:818050135330258965> Yazma süre limiti ${limit} Saniye olarak ayarlanmıştır**`)
    .setColor("YELLOW")
    msg.channel.send({embed: e});
  

request({
    url: `https://discordapp.com/api/v7/channels/${msg.channel.id}`,
    method: "PATCH",
    json: {
        rate_limit_per_user: limit
    },
    headers: {
        "Authorization": `Bot ${client.token}`
    },
})
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yavaşmod'],
  permLevel: 0
};

module.exports.help = {
  name: 'yavaşmod-ayarla',
  description: '',
  usage: ''
};
