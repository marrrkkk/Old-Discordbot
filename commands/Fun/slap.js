const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'slap',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mention someone')

        try {
            axios.get('https://nekos.best/api/v1/slap')
            .then(async (res) => {
                const slap = new MessageEmbed()
                .setAuthor('(¬_¬ )', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<@${message.author.id}> slapped <@${member.id}>`)
                .setImage(res.data.url)
                .setColor('ORANGE')
    
                await message.channel.send({ embeds: [slap] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}