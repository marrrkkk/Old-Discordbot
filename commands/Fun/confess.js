const { Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'confess',
    aliases: ['cfs'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        try {
            if(message.channel.type !== 'DM'){
                return message.channel.send('This command only work on DM')
                .then(async () => await message.member.send('If you want to confess do it in DM to keep anonymous or you can use Slash Command, `/confess`'))
            }
        } catch (error) {
            console.log(error)
        }
    }
}