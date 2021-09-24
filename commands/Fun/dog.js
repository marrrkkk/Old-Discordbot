const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'dog',
    aliases: ['woof'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            axios.get('https://random.dog/woof.json')
            .then(async (res) => {
              const dog = new MessageEmbed()
              .setImage(res.data.url)
              .setColor('RANDOM')
      
              await message.channel.send({ embeds: [dog] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}