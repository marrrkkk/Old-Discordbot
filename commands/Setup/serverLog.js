const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "set-log",
    description: "...",

    async run (client, message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        db.set(`setlogs_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const d = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disable Server Log')
            .setColor('RED')
            await db.delete(`setlogs_${message.guild.id}`)
            return message.channel.send({ embeds: [d] }).catch(e => console.log(e))
        }

        const chembed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:developer:873923621482033212> Server logs has been set to ${channel}`)
        .setColor('GREEN')
        try {
            await message.channel.send({ embeds: [chembed] })
        } catch (error) {
            console.log(error)
        }
    }
}