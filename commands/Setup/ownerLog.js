const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "guild-log",
    description: "...",

    async run (client, message, args){
        if(message.author.id !== '814406096022011934') return;
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        db.set(`clientlogs_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const c = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disable Guild Log')
            .setColor('RED')
            await db.delete(`clientlogs_${message.guild.id}`)
            return message.channel.send({ embeds: [c] }).catch(e => console.log(e))
        }

        const cchembed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:developer:873923621482033212> Guild logs has been set to ${channel}`)
        .setColor('GREEN')
        try {
            await message.channel.send({ embeds: [cchembed] })
        } catch (error) {
            console.log(error)
        }
    }
}