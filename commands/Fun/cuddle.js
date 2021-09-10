const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'cuddle',
    aliases: ['hug'],

    async run (client, message, args){
        const member = message.mentions.members.first() || message.member;

        axios.get('https://nekos.life/api/v2/img/cuddle')
        .then((res) => {
            const hug = new MessageEmbed()
            .setAuthor('(❁´◡`❁)', message.author.displayAvatarURL())
            .setDescription(`<@${message.author.id}> hugged <@${member.id}>`)
            .setImage(res.data.url)
            .setColor('RANDOM')

            message.channel.send({ embeds: [hug] })
        })
    }
}