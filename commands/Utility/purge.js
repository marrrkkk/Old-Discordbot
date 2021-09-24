const {Client, Message } = require('discord.js')

module.exports = {
    name: 'purge',
    aliases: ['clear'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("MANAGE_MESSAGES")) return message.reply({ content: "<:cross:873923620517347389>  I don't have the `MANAGE_MESSAGE` permission", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.reply({ content: "<:cross:873923620517347389>  You don't have pemission to manage message", allowedMentions:{repliedUsers:false} })

        if(!args[0]) return message.reply({ content: "Please enter the amount you want to delete `0 - 100`", allowedMentions:{repliedUsers:false}})
        if(isNaN(args[0])) return message.reply({ content: "Please enter a valid number", allowedMentions:{repliedUsers:false} })
        if(parseInt(args[0] > 99)) return message.reply({ content: "The max amount of messages you can delete is `99`", allowedMentions:{repliedUsers:false} })

        await message.channel.bulkDelete(parseInt(args[0]) + 1).catch(err => console.log(err))
    }
}