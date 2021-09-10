const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'cum',

    async run (client, message, args){
        if(!message.channel.nsfw){
            const er = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("<:channel_nsfw:873923620517322782> This command only works in a NSFW Channel")
            .setColor("RED")

            message.channel.send({ embeds: [er] }).catch(er => console.log(er))
        } else{
            axios.get('https://nekos.life/api/v2/img/cum')
            .then((res) => {
                const cum = new MessageEmbed()
                .setImage(res.data.url)
                .setColor('RANDOM')

                message.channel.send({ embeds: [cum] }).catch(e => console.log(e))
            })
        }
    }
}