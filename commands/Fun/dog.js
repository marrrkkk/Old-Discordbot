const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "dog",
    description: "...",

    async run (client, message, args){
      axios.get('https://random.dog/woof.json')
      .then((res) => {
        const dog = new MessageEmbed()
        .setImage(res.data.url)
        .setColor('RANDOM')

        message.channel.send({ embeds: [dog] }).catch(e => console.log(e))
      })
    }
}