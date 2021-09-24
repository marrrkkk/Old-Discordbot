const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'meme',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            axios.get('https://meme-api.herokuapp.com/gimme')
            .then(async (res) => {
              const meme = new MessageEmbed()
              .setTitle(res.data.title)
              .setImage(res.data.url)
              .setFooter(`${res.data.subreddit} ${res.data.postLink}`)
              .setColor('ORANGE')
      
              await message.channel.send({ embeds: [meme] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}