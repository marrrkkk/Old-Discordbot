const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'bite',

    async run (client, message, args){
        const member = message.mentions.members.first() || message.member;

        axios.get('https://nekos.best/api/v1/bite')
        .then((res) => {
            const bite = new MessageEmbed()
            .setAuthor('(T_T)', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${message.author.id}> bit <@${member.id}>`)
            .setImage(res.data.url)
            .setColor('PURPLE')

            message.channel.send({ embeds: [bite] }).catch(e => console.log(e))
        })
    }
}