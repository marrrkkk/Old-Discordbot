const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "waifu",
    description: "...",

    async run (client, message){
      axios.get('https://api.waifu.pics/sfw/waifu')
      .then((res) => {
        const w = new MessageEmbed()
        .setImage(res.data.url)
        .setColor('RANDOM')

        message.channel.send({ embeds: [w] }).catch(e => console.log(e))
      })
    }
}