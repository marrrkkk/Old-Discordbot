const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'pat',

    async run (client, message, args){
        const member = message.mentions.members.first() || message.member;

        axios.get('https://nekos.best/api/v1/pat')
        .then((res) => {
            const pat = new MessageEmbed()
            .setAuthor('(✿◡‿◡)', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${message.author.id}> patted <@${member.id}>`)
            .setImage(res.data.url)
            .setColor('BLUE')

            message.channel.send({ embeds: [pat] }).catch(e => console.log(e))
        })
    }
}