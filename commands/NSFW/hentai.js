const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'hentai',

    async run (client, message, args){
        if(!message.channel.nsfw){
            const er = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("<:channel_nsfw:873923620517322782> This command only works in a NSFW Channel")
            .setColor("RED")

            message.channel.send({ embeds: [er] }).catch(e => console.log(e))
        } else {
            axios.get('https://nekos.life/api/v2/img/Random_hentai_gif')
            .then((res) => {
                const hentai = new MessageEmbed()
                .setImage(res.data.url)
                .setColor('RANDOM')

                message.channel.send({ embeds: [hentai] }).catch(error => console.log(error))
            })
        }
    }
}