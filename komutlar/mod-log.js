const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  
if (!message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(`**<:Beklemede:818050135330258965> Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın.**`);

let logk = message.mentions.channels.first();
let logkanal = await db.fetch(`codeminglog_${message.guild.id}`)
  
if (args[0] === "sıfırla" || args[0] === "kapat") {
  
if(!logkanal) return message.channel.send(new Discord.MessageEmbed()
                                               
.setDescription(`**<:Beklemede:818050135330258965> Mod-Log kanalı zaten ayarlı değil**`)
.setColor("YELLOW"));
    
db.delete(`codeminglog_${message.guild.id}`)
  
message.channel.send(new Discord.MessageEmbed()
                          
.setDescription(`**<:Beklemede:818050135330258965> Mod-Log Kanalı başarıyla sıfırlandı**`)
.setColor("YELLOW"));

return
}
  
if (!logk) return message.channel.send(new Discord.MessageEmbed()
.setDescription(`**<:Beklemede:818050135330258965> Mod-Log kanalı belirt**`)
.setColor("YELLOW"));
 

db.set(`codeminglog_${message.guild.id}`, logk.id)

message.channel.send(new Discord.MessageEmbed()
.setDescription(`**<:Beklemede:818050135330258965> Mod-Log kanalı başarıyla ${logk} olarak ayarlandı.**`)
.setColor("YELLOW"));

console.log(` Mod-log komutu ${message.author.username} Tarafından kullanıldı`)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['mod-log'],
    permLevel: 0 
};

exports.help = {
    name: 'modlog'
};