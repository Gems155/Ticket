const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'transcript',
	category: 'Ticket',
	description: 'Trascripts a specified ticket.',
	aliases: [],
	usage: 'transcript',
	userperms: [],
	botperms: [],
	run: async (client, message, args) => {
		const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
		if (channel.name.includes('ticket-')) {
			if (message.member.hasPermission('ADMINISTRATOR') || channel.name === `ticket-${message.author.id}`) {
				channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: ' ',
								content: output,
								languageId: 'text',
							},
						], {
							title: `สำเนาแชทสำหรับ ${channel.name}`,
							description: ' ',
						});
					}
					catch(e) {
						return message.channel.send('เกิดข้อผิดพลาด โปรดลองอีกครั้ง!');
					}
message.react('887650847327158343');
					const embed = new MessageEmbed()
						.setDescription(`[\`📄 View\`](${response.url})`)
						.setColor('GREEN');
					message.reply('สำเนาแชทเสร็จสมบูรณ์ โปรดคลิกลิงก์ด้านล่างเพื่อดูสำเนาแชท', embed);
				});
			}
		}
		else {
			return message.reply(
				'คุณไม่สามารถใช้คำสั่งนี้ที่นี่ โปรดใช้คำสั่งนี้ในการเปิดตั๋ว',
			);
		}
	},
};