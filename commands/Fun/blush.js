const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'blush',

    async run (client, message, args){
        axios.get('https://nekos.best/api/v1/blush')
        .then((res) => {
            const blush = new MessageEmbed()
            .setAuthor("(●'◡'●)", message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${message.author.id}> blushed`)
            .setImage(res.data.url)
            .setColor('RED')

            message.channel.send({ embeds: [blush] }).catch(e => console.log(e))
        })
    }
}