const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('<:dnd:818050135246110731>  Uyarı <:dnd:818050135246110731>', '`kick` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('**<:Beklemede:818050135330258965> Atılacak Kişiyi Etiketleyiniz.**').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('**<:Beklemede:818050135330258965> Yetkilileri sunucudan atamam.**');
  message.guild.member(user).kick();

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'kick [kullanıcı] [sebep]'
};