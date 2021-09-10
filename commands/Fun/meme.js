const { MessageEmbed } = require('discord.js')
const axios = require('axios');

module.exports = {
    name: "meme",
    description: "...",

    async run (client, message){
      axios.get('https://meme-api.herokuapp.com/gimme')
      .then((res) => {
        const meme = new MessageEmbed()
        .setTitle(res.data.title)
        .setImage(res.data.url)
        .setFooter(`${res.data.subreddit} ${res.data.postLink}`)
        .setColor('ORANGE')

        message.channel.send({ embeds: [meme] }).catch(e => console.log(e))
      })
    }
}