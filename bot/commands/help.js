const MessageButton = require('discord-buttons');
const Discord = require('discord.js');
const client = new Discord.Client();
const disbut = require("discord-buttons");

const { MessageMenuOption, MessageMenu } = require("discord-buttons");
 
 module.exports = {
    name: "help",
    cooldown: 5,
    aliases: ["commands", "auda"],
 
run: async (bot, message, args) => { //async
      //--------------------------------------S T A R T--------------------------------------//
 
      message.react('887650847327158343');


                const embed = new Discord.MessageEmbed()
                .setTitle(`Tickets Premium`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`_**คลิกบนเมนูเลือกด้านล่างเพื่อ __Swap__ หน้าช่วยเหลือ**_\n🏠 - หน้าแรก\n🎟️ - คำสั่งพรีเมียม ( ตั๋ว )\n❔ - คุณสมบัติพรีเมียม\n📔 - เกี่ยวกับฉัน`)
                .setColor(`#0x2F3136`)

                const embed2 = new Discord.MessageEmbed()
                .setTitle(`Premium Ticket Commands`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`**__Here Are My Commands:__**\n\`setup,\` \`transcript,\` \`rename,\` \`remove,\` \`ping,\` \`open,\` \`close\``)
                .setColor(`#0x2F3136`)

                const embed3 = new Discord.MessageEmbed()
                .setTitle(`My Premium Features`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`**สวัสดี ตั๋ว __PREMIUM__! คุณอาจถาม อะไรที่แตกต่างจากฉันมากกว่าระบบ Multi-ticket ปกติ**? ฉันมี อีโมจิที่ดีกว่า ปุ่มที่ดีกว่า และคุณสมบัติอื่น ๆ อีกมากมาย!`)
                .setColor(`#0x2F3136`)

                // Last embed
                const embed4 = new Discord.MessageEmbed()
                .setTitle(`About Me`)
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setDescription(`**ฉันถูกสร้างโดย, \`NomYen#8031\`!\n\nเข้าร่วมการสนับสนุนของฉัน [server](https://dsc.gg/nomyen4)**`)
                .setColor(`#0x2F3136`)

                //-----------------------------OPTIONS----------------------
        //examples .setLabel('Put What You Want to put')
        //.setValue('')
        //.setDescription('put what u wantnto put')
 
        let option1 = new MessageMenuOption()
        .setLabel('Home Page')
        .setValue('option1')
        .setEmoji("🏠")
        .setDescription('ดูคำสั่งทั้งหมด')

        let option2 = new MessageMenuOption()
        .setLabel('Commands')
        .setValue('option2')
        .setEmoji("🎫")
        .setDescription('ดูคำสั่งตั๋วพรีเมียม')

        let option3 = new MessageMenuOption()
        .setLabel('Features')
        .setValue('option3')
        .setEmoji("❓")
        .setDescription('ดูคุณสมบัติพรีเมียมของฉัน')
  
      let option4 = new MessageMenuOption()
        .setLabel('About Me')
        .setValue('option4')
        .setEmoji("📔")
        .setDescription('ดูเกี่ยวกับของฉัน')
  

        let select = new MessageMenu()
        .setID('selector')
        .setPlaceholder('Ticket Bot Menu')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(option1, option2, option3, option4)

        const Sendmenu = await message.channel.send(embed, select);

        let collector = Sendmenu.createMenuCollector(b => b, { time : 60000 });
 
    collector.on("collect" , (b) => {
      
        if(b.clicker.user.id !== message.author.id)
              return b.reply.send(`❌ **อนุญาต <@${message.author.id}> เท่านั้นให้ตอบสนองเท่านั้น!**\n**เคล็ดลับ**: \`หากต้องการใช้คำสั่งนี้ ให้พิมพ์คำสั่งช่วยเหลือ\``, true)  

      
        if(b.values[0] == "option1") {
            Sendmenu.edit(embed, select)
        }

        if(b.values[0] == "option2") {
            Sendmenu.edit(embed2, select)
        }

        if(b.values[0] == "option3") {
            Sendmenu.edit(embed3, select)
        }

        if(b.values[0] == "option4") {
            Sendmenu.edit(embed4, select)
        }
 b.reply.defer();
 
 
        
    })
 
    collector.on("end", (b) => {
        Sendmenu.edit(new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription("เมนูช่วยเหลือนี้หมดเวลา! กรุณาพิมพ์ \`Help Command\` อีกครั้ง")
        .setFooter("สนับสนุบโดย NomYen#8031"))
    })

    }
}