const { MessageButton, MessageActionRow } = require('discord-buttons');
const Discord = require('discord.js');

module.exports = {
    name: "setup",
    cooldown: 5,
    aliases: ["create"],

    run: async function(client, message, args) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You should have admin perms to use this command!"
      );
    }
        try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || '**เจ้าหน้าที่ของ Aya | support จะติดต่อกลับกับคุณในไม่ช้า**\n\n__**ที่นี่คุณสามารถเปิดการสนับสนุน อื่นๆ และแม้แต่ตั๋วเรียกร้องสิทธิ์!**__\n`คลิกปุ่มหมวดหมู่ด้านล่างตามความต้องการของคุณ`';
            if (!adminRole) {
                message.channel.send({
                    embed: {
                        title: `❌ | Wrong use`,
                        description: `⚠ | การใช้งานที่ถูกต้อง: ${prefix}setup <Ticket Channel> <Admins Role> <Ticket Message Desc>`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            message.react('887650847327158343');
            message.channel.send(`Success!`);
            let btn = new MessageButton()
                .setStyle("red")
                .setLabel("รายงานบัค")
                .setEmoji('850829758912528435')
                .setID("createTicket")
                let btn2 = new MessageButton()
                .setStyle("blurple")
                .setLabel("อื่นๆ")
                .setEmoji('888350726877769728')
                .setID("otherTicket")
                let btn3 = new MessageButton()
                .setStyle("green")
                .setLabel("เรียกร้อง")
                .setID("claimTicket")
                let row = new MessageActionRow()
                .addComponent(btn)
                .addComponent(btn2)
                .addComponent(btn3)

                
                const panel = new Discord.MessageEmbed()
                .setTitle(`<:aya:935428199792390164>  Aya | Support`)
                .setDescription(`${title}`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setColor(`#0x2F3136`)
            ticketChannel.send(panel, row)
            .then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
            })
        } catch (err) {
            return;
        }
    }
}
