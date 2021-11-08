const {Client, Message } = require('discord.js')
const { ownerID } = require('../../config.json')

module.exports = {
    name: 'guildleave',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(message.author.id !== ownerID) return
        try {
            const guild = client.guilds.cache.get(args[0])
            if(!guild) return message.channel('Not a valid guild ID')
    
            await guild.leave()
            await message.channel.send(`Leave the guild **${guild.name}**`)
        } catch (error) {
            console.log(error)
        }
    }
}