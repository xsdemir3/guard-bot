const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('wio.db')


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
// KANAL KORUMA //
client.on('channelDelete', (channel) => {
    if(db.has(`kanalk_${channel.guild.id}`) === false) return;
    let kategoriID = channel.parentID;
    channel.clone({ name: channel.name, reason: 'izinsiz silindi.' }).then(channels => {
    channels.send(`**<:Beklemede:818050135330258965> Bu kanal silindi ve kanal koruma sistemi sayesinde başarıyla tekrardan açıldı**\n**<:Beklemede:818050135330258965> Kanalın adı, kanalın konusu, kanalın kategorisi, kanalın izinleri başarıyla ayarlandı.**`);                     
  });
});
// KANAL KORUMA SON //

//mod log//
client.on('channelCreate', async channel => {
    const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
    if (!c) return;
      var embed = new Discord.MessageEmbed()
                      .addField(`**<:Beklemede:818050135330258965> Kanal oluşturuldu**`, `**<:Beklemede:818050135330258965> İsmi: \`${channel.name}\`**\n**<:Beklemede:818050135330258965>  Türü: ** **${channel.type}**\n**<:Beklemede:818050135330258965> ID: ${channel.id}**`)
                      .setColor("YELLOW")
      c.send(embed)
  });
  
  client.on('channelDelete', async channel => {
    const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
    if (!c) return;
      let embed = new Discord.MessageEmbed()
                      .addField(`**<:Beklemede:818050135330258965> Kanal silindi**`, `**<:Beklemede:818050135330258965> İsmi: \`${channel.name}\`**\n**<:Beklemede:818050135330258965> Türü: ** **${channel.type}**\n**<:Beklemede:818050135330258965> ID: ${channel.id}**`)
                      .setColor("YELLOW")
  
      c.send(embed)
  });
  
     client.on('channelNameUpdate', async channel => {
    const c = channel.guild.channels.cache.get(db.fetch(`codeminglog_${channel.guild.id}`));
    if (!c) return;
      var embed = new Discord.MessageEmbed()
                      .addField(`**<:Beklemede:818050135330258965> Kanal İsmi değiştirildi**`, `**<:Beklemede:818050135330258965> Yeni İsmi: \`${channel.name}\`**\n**<:Beklemede:818050135330258965> ID: ${channel.id}**`)
                      .setColor("YELLOW")
      c.send(embed)
  });
  
  client.on('emojiCreate', emoji => {
    const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
    if (!c) return;
  
      let embed = new Discord.MessageEmbed()
                      .addField(`**<:Beklemede:818050135330258965> Emoji oluşturuldu**`, `**<:Beklemede:818050135330258965> İsmi: \`${emoji.name}\`**\n**<:Beklemede:818050135330258965>  GIF?: ** **${emoji.animated}**\n**<:Beklemede:818050135330258965> ID: ${emoji.id}**`)
                      .setColor("YELLOW")
  
      c.send(embed)
      });
  client.on('emojiDelete', emoji => {
    const c = emoji.guild.channels.cache.get(db.fetch(`codeminglog_${emoji.guild.id}`));
    if (!c) return;
  
      let embed = new Discord.MessageEmbed()
                      .addField(`**<:Beklemede:818050135330258965> Emoji silindi**`, `**<:Beklemede:818050135330258965> İsmi: \`${emoji.name}\`**\n**<:Beklemede:818050135330258965>  GIF? : ** **${emoji.animated}**\n**<:Beklemede:818050135330258965> ID: ${emoji.id}**`)
                      .setColor("YELLOW")
  
      c.send(embed)
      });
  client.on('emojiUpdate', (oldEmoji, newEmoji) => {
    const c = newEmoji.guild.channels.cache.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
    if (!c) return;
  
      let embed = new Discord.MessageEmbed()
                      .addField(`**<:Beklemede:818050135330258965> Emoji güncellendi**`, `**<:Beklemede:818050135330258965> Eski ismi: \`${oldEmoji.name}\`**\n**<:Beklemede:818050135330258965> Yeni ismi: \`${newEmoji.name}\`**\n**<:Beklemede:818050135330258965> ID: ${oldEmoji.id}**`)
                      .setColor("YELLOW")
  
      c.send(embed)
      });
  
  client.on('guildBanAdd', async (guild, user) => {    
      const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
    if (!channel) return;
    
    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  
      let embed = new Discord.MessageEmbed()
                      .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL())
                      .addField(`**<:Beklemede:818050135330258965> Kullanıcı banlandı**`, `**<:Beklemede:818050135330258965> İsmi: \`${user.username}\`**\n**<:Beklemede:818050135330258965> ID: **${user.id}** **\n**<:Beklemede:818050135330258965> Sebep: ** **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                      .setColor("YELLOW")
  
      channel.send(embed)
  });
  
  client.on('guildBanRemove', async (guild, user) => {    
      const channel = guild.channels.cache.get(db.fetch(`codeminglog_${guild.id}`));
    if (!channel) return;
    
    const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  
      let embed = new Discord.MessageEmbed()
                      .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL())
                      .addField(`**<:Beklemede:818050135330258965> Kullanıcının banı açıldı**`, `**<:Beklemede:818050135330258965> İsmi: \`${user.username}\`**\n**<:Beklemede:818050135330258965> ID: **${user.id}** **\n**<:Beklemede:818050135330258965> Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}** **`)
                      .setColor("YELLOW")
  
      channel.send(embed)
  });
  client.on('messageDelete', async message => {    
    if(message.author.bot) return
  
      const channel = message.guild.channels.cache.get(db.fetch(`codeminglog_${message.guild.id}`));
    if (!channel) return;
    
      let embed = new Discord.MessageEmbed()
                      .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                      .setTitle("**<:Beklemede:818050135330258965> Mesaj silindi**")                
                      .addField(`**<:Beklemede:818050135330258965> Silinen mesaj : ${message.content}**`,`**<:Beklemede:818050135330258965> Kanal: ${message.channel.name}**`)
                      .addField(`**<:Beklemede:818050135330258965> Kanal:**`,`**<:Beklemede:818050135330258965> ${message.channel.name}**`)
                      .setColor("YELLOW")
  
      channel.send(embed)
  });
  
  client.on('messageUpdate', async(oldMessage, newMessage) => {
      if(oldMessage.author.bot) return;
      if(oldMessage.content == newMessage.content) return;
  
      const channel = oldMessage.guild.channels.cache.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
      if(!channel) return;
  
      let embed = new Discord.MessageEmbed()
      .setTitle("**<:Beklemede:818050135330258965> Mesaj güncellendi**")
      .addField("**<:Beklemede:818050135330258965> Eski mesaj : **",`**<:Beklemede:818050135330258965> ${oldMessage.content}**`)
      .addField("**<:Beklemede:818050135330258965> Yeni mesaj : **",`**<:Beklemede:818050135330258965> ${newMessage.content}**`)
      .addField("**<:Beklemede:818050135330258965> Kanal : **",`**<:Beklemede:818050135330258965> ${oldMessage.channel.name}**`)
      .setColor("YELLOW")
  
      channel.send(embed)
  });
  
  client.on('roleCreate', async (role) => {    
  
      const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
    if (!channel) return;
    
      let embed = new Discord.MessageEmbed()
  .addField(`**<:Beklemede:818050135330258965> Rol oluşturuldu**`, `**<:Beklemede:818050135330258965> ismi: \`${role.name}\`**\n**<:Beklemede:818050135330258965> ID: ${role.id}**`)                    
  .setColor("YELLOW")
  .addField("**<:Beklemede:818050135330258965> Rol renk kodu : **",`**<:Beklemede:818050135330258965>${role.hexColor}**`)

  
      channel.send(embed)
  });
  
  client.on('roleDelete', async (role) => {    
  
      const channel = role.guild.channels.cache.get(db.fetch(`codeminglog_${role.guild.id}`));
    if (!channel) return;
    
      let embed = new Discord.MessageEmbed()
  .addField(`**<:Beklemede:818050135330258965> Rol silindi**`, `**<:Beklemede:818050135330258965> ismi: \`${role.name}\`**\n**<:Beklemede:818050135330258965> ID: ${role.id}**`)                    
  .setColor("YELLOW")
  .addField("**<:Beklemede:818050135330258965> Rol renk kodu : **",`**<:Beklemede:818050135330258965> ${role.hexColor}**`)

      channel.send(embed)
  })

//mod-log SON//
// REKLAM ENGEL //
client.on('message', message => {
    const slaltyapı = ['.org','.tr','.space','.funy','.fun','.com','.xyz','.glitch-me','.eueo.org','free.biz','.biz','.free','.blogspot-com','.alan','.com.tr','.sexs','.hub','.dance','.in','.net','.shop','.store','.click','.tech','.best','.college','.me','.site','.online','.art','.host','.baby','.website','.blog','.link','.top','.info','.press','.monster','.services']
    if(slaltyapı.some(slaltyapı => message.content.includes(slaltyapı))){
      message.delete()
  
      const slaltyapı = new Discord.MessageEmbed()
      .setDescription(`**Birdaha Reklam Yapma ${message.author}**`)
      .setColor('#36393F')
      message.channel.send(slaltyapı)
    }
  })
// REKLAM ENGEL SON //