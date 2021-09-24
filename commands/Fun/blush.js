const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'blush',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            axios.get('https://nekos.best/api/v1/blush')
            .then(async (res) => {
                const blush = new MessageEmbed()
                .setAuthor("(●'◡'●)", message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<@${message.author.id}> blushed`)
                .setImage(res.data.url)
                .setColor('RED')
    
                await message.channel.send({ embeds: [blush] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}