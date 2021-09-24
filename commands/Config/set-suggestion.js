const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'suggestion',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        await db.set(`suggestion_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const embed = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disabled Suggestion')
            .setColor('RED')
            await db.delete(`suggestion_${message.guild.id}`)
            return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
        }
        const embed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:Partner:873923621129703465> Suggestion has been set to ${channel}`)
        .setColor('GREEN')

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}