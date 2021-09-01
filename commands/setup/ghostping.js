const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "anti-ghostping",
    description: "...",

    async run (client, message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: "You don't have permission to use this command", allowedMentions:{repliedUsers:false}})
        if(!args[0]) return message.reply({ content: "Usage: `ghostping on/off`", allowedMentions:{repliedUsers:false}})
        if(args[0] === "on"){
            await db.set(`anti-ghostping-${message.guild.id}`, true)

            const on = new MessageEmbed()
            .setTitle('<:online:880155848284995634> Enabled')
            .setDescription("Turned on Anti-Ghostping feature")
            .setColor("GREEN")

            message.channel.send({ embeds: [on] })
        }
        if(args[0] === "off"){
            await db.delete(`anti-ghostping-${message.guild.id}`)

            const off = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription("Turned off Anti-Ghostping feature")
            .setColor('LUMINOUS_VIVID_PINK')

            message.channel.send({ embeds: [off] })
          }
        }
    }

