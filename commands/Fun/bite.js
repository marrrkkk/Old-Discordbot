const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'bite',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mention someone')

        try {
            axios.get('https://nekos.best/api/v1/bite')
            .then(async (res) => {
                const bite = new MessageEmbed()
                .setAuthor('(T_T)', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<@${message.author.id}> bit <@${member.id}>`)
                .setImage(res.data.url)
                .setColor('PURPLE')
    
                await message.channel.send({ embeds: [bite] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}