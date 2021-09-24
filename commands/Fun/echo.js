const { Client, Message } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'echo',
    aliases: ['say'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return
        let prefix = db.fetch(`prefix_${message.guild.id}`)
        if(prefix === null){
            prefix = ','
        }

        const channel = message.mentions.channels.first()
        const msg = args.join(" ")

        if(!msg) return message.reply({ content: `Usage: \`${prefix}echo <#channel> [message]\``, allowedMentions: {repliedUsers: false}})
        if(!channel){
            message.channel.send(msg).catch(er => console.log(er))
        } else {
            channel.send(msg).catch(e => console.log(e))
        }
    }
}