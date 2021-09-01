const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "set-chatbot",
    description: "...",

    async run (client, message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        db.set(`chatbot_${message.guild.id}`, channel.id)

        
        if(args[0] === "disable"){
            await db.delete(`chatbot_${message.guild.id}`)
            return message.channel.send("Disabled")
        }

        const s = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Success')
        .setDescription(`Chatbot has been set to ${channel}`)
        .setColor('GREEN')

        message.channel.send({ embeds: [s] })
    }
}