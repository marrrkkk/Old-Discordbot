const axios = require('axios')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'kiss',

    async run (client, message, args){
        const member = message.mentions.members.first() || message.member;

        axios.get('https://nekos.best/api/v1/kiss')
        .then((res) => {
            const kiss = new MessageEmbed()
            .setAuthor('(づ￣ 3￣)づ', message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`<@${message.author.id}> kissed <@${member.id}> <a:heart:884000448107917353>`)
            .setImage(res.data.url)
            .setColor('LUMINOUS_VIVID_PINK')

            message.channel.send({ embeds: [kiss] }).catch(e => console.log(e))
        })
    }
}