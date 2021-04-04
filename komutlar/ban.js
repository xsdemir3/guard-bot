const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField('<:dnd:818050135246110731> Uyarı <:dnd:818050135246110731>', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (reason.length < 1) return message.reply('**<:Beklemede:818050135330258965> Ban sebebini yazmalısın.**');
  if (message.mentions.users.size < 1) return message.reply('**<:Beklemede:818050135330258965> Kimi banlayacağını yazmalısın.**').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('**<:Beklemede:818050135330258965> Yetkilileri banlayamam.**');
  message.guild.member(user).ban();

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan yasaklar.',
  usage: 'ban [kullanıcı] [sebep]'
};