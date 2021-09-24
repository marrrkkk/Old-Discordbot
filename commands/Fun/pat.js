const { Client, Message, MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'pat',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const member = message.mentions.members.first()
        if(!member) return message.reply('Mention someone')

        try {
            axios.get('https://nekos.best/api/v1/pat')
            .then(async (res) => {
                const pat = new MessageEmbed()
                .setAuthor('(✿◡‿◡)', message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`<@${message.author.id}> patted <@${member.id}>`)
                .setImage(res.data.url)
                .setColor('BLUE')
    
                await message.channel.send({ embeds: [pat] }).catch(e => console.log(e))
            })
        } catch (error) {
            console.log(error)
        }
    }
}