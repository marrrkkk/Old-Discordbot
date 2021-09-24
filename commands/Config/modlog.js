const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'modlog',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        await db.set(`setmodlogs_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const embed = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disable Mod Logging')
            .setColor('RED')
            await db.delete(`setmodlogs_${message.guild.id}`)
            return message.channel.send({ embeds: [embed] })
        }

        
        const embed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:blurplecertifiedmoderator:879212267470749746> Mod Logging has been set to ${channel}`)
        .setColor('GREEN')

        await message.channel.send({ embeds: [embed] })
    }
}