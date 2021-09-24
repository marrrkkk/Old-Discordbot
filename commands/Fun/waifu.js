const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'waifu',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            axios.get('https://api.waifu.pics/sfw/waifu')
            .then(async (res) => {
              const embed = new MessageEmbed()
              .setImage(res.data.url)
              .setColor('RANDOM')
      
              await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}