const db = require("wio.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("Kanal Koruma sistemi!")
      .setDescription(
        "**<:Beklemede:818050135330258965> Hatalı kullanım! örnek: s!kanal-koruma aç veya kapat**"
      );

    message.channel.send(embed);
    return;
  }
  let kanal = await db.fetch(`kanalk_${message.guild.id}`)
  if (args[0] == "aç") {
    if (kanal) {
      const embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("kanal Koruma sistemi!")
        .setDescription("**<:Beklemede:818050135330258965> Görünüşe göre kanal koruma zaten aktif**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`kanalk_${message.guild.id}`, "acik");
      const embed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("Kanal Koruma sistemi!")
        .setDescription("**<:Beklemede:818050135330258965> Kanal koruma başarıyla açıldı**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`kanalk_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Kanal Koruma sistemi!")
      .setDescription("**<:dnd_:818050135463559188>  Kanal Koruma başarıyla kapandı**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kanal-k"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "kanal-koruma",
  description: "kanal koruma",
  usage: "kanal-koruma"
};
