const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'slap',

    async run (client, message, args){
        const member = message.mentions.members.first() || message.member;

        axios.get('https://nekos.best/api/v1/slap')
        .then((res) => {
            const slap = new MessageEmbed()
            .setAuthor('(¬_¬ )', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${message.author.id}> slapped <@${member.id}>`)
            .setImage(res.data.url)
            .setColor('ORANGE')

            message.channel.send({ embeds: [slap] }).catch(e => console.log(e))
        })
    }
}