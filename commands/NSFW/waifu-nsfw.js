const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: "waifu-nsfw",
    description: "...",

    async run (client, message){
        if(!message.channel.nsfw){
            const er = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("<:channel_nsfw:873923620517322782> This command only works in a NSFW Channel")
            .setColor("RED")

            message.channel.send({ embeds: [er] }).catch(er => console.log(er))
        } else {
      axios.get('https://api.waifu.pics/nsfw/waifu')
      .then((res) => {
        const ns = new MessageEmbed()
        .setImage(res.data.url)
        .setColor('RANDOM')

        message.channel.send({ embeds: [ns] }).catch(e => console.log(e))
      })
        }
    }
}