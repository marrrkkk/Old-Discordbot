const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'cuddle',
    aliases: ['hug'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mentions someone')

        try {
            axios.get('https://nekos.life/api/v2/img/cuddle')
            .then(async (res) => {
                const hug = new MessageEmbed()
                .setAuthor('(❁´◡`❁)', message.author.displayAvatarURL())
                .setDescription(`<@${message.author.id}> hugged <@${member.id}>`)
                .setImage(res.data.url)
                .setColor('RANDOM')
    
                await message.channel.send({ embeds: [hug] })
            })
        } catch (error) {
            console.log(error)
        }
    }
}