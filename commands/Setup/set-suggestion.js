const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'set-suggestion',

    async run (client, message, args){
        if(!message.member.permissions.has('ADMINISTRATOR')) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        db.set(`suggestion_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const d = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disable Suggestion')
            .setColor('RED')
            await db.delete(`suggestion_${message.guild.id}`)
            return message.channel.send({ embeds: [d] }).catch(e => console.log(e))
        }
        const sembed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:Partner:873923621129703465> Suggestion has been set to ${channel}`)
        .setColor('GREEN')
        try {
            await message.channel.send({ embeds: [sembed] })
        } catch (error) {
            console.log(error)
        }
        
    }
}