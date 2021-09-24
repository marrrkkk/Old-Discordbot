const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'kiss',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mention someone')

        try {
            axios.get('https://nekos.best/api/v1/kiss')
            .then(async (res) => {
                const kiss = new MessageEmbed()
                .setAuthor('(づ￣ 3￣)づ', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<@${message.author.id}> kissed <@${member.id}> <a:heart:884000448107917353>`)
                .setImage(res.data.url)
                .setColor('LUMINOUS_VIVID_PINK')
    
                await message.channel.send({ embeds: [kiss] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}