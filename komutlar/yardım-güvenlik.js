const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '!'
let yardım = new Discord.MessageEmbed()  
.setAuthor(`${client.user.username}`, client.user.avatarURL())
.setColor('YELLOW')
.addField('<:sar:827521569894957077> Yardım Menüsü',`

**<:Beklemede:818050135330258965>  s!yavaşmod-ayarla** \n <:sar:827521569894957077> Sohbete yazma sınırı (süre) ekler.
**<:Beklemede:818050135330258965>  s!kick** \n <:sar:827521569894957077> Etiketlediğiniz Üyeyi sunucudan kickler.
**<:Beklemede:818050135330258965>  s!ban** \n <:sar:827521569894957077> Etiketlediğiniz Üyeyi sunucudan.
**<:Beklemede:818050135330258965>  s!kanal-koruma** \n <:sar:827521569894957077> Kanal koruma sistemini aktif hale getirirsiniz.
**<:Beklemede:818050135330258965>  s!mod-log** \n <:sar:827521569894957077> Mod log kanalı ayarlarsınız
  `)
.setImage("https://cdn.discordapp.com/attachments/818044578858270740/828302122394845184/SL_ALTYAPI_3.gif")
.setThumbnail(client.user.avatarURL())
 message.channel.send(yardım) 

  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['y'],
  permLevel: 0
};

exports.help = {
  name: "yardım-güvenlik",// kullanım
  category: "yardım",
};