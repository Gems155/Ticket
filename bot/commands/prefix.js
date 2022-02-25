module.exports = {
    name: "t-prefix",
    cooldown: 5,
    aliases: ["T-prefix"],

    run: async function(client, message, args) {
        try {
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.channel.send({
                    embed: {
                        title: `**❌ | Error**`,
                        description: `คุณต้องมีสิทธิ์เพื่อใช้คำสั่งนี้`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var newPrefix = args.join(' ')
            if (!newPrefix) {
                require('quick.db').set(`prefix_${message.guild.id}`, require('../../config/bot').prefix);
                message.channel.send({
                    embed: {
                        description: `
คำนำหน้าบอทได้พักไว้ที่**${require('../../config/bot').prefix}**`,
                        color: 0x00D700
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
            } else if (newPrefix) {
                if (newPrefix.length > 7) {
                    message.channel.send({
                        embed: {
                            color: 0xFF0000,
                            title: `**❌ | Error**`,
                            description: `คำนำหน้านี้ยาว`
                        }
                    }).then(async function(msg) {
                        setTimeout(() => {
                            msg.delete().catch(err => { return })
                        }, 1000 * 7);
                    })
                    return
                }
                require('quick.db').set(`prefix_${message.guild.id}`, newPrefix);
                message.channel.send({
                    embed: {
                        description: `คำนำหน้าบอทเปลี่ยนเป็น **${newPrefix}**`,
                        color: 0x00D700
                    }
                })
            }
        } catch (err) {
            return;
        }
    }
}
