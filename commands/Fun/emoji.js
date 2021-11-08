const { Client, Message, MessageEmbed, Util, MessageAttachment } = require('discord.js')
const { parse } = require('twemoji-parser')
const moment = require('moment')

module.exports = {
    name: 'emoji',
    aliases: ['e'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const emoji = args[0]
        if(!emoji) return message.channel.send('<:cross:873923620517347389> Please provide an emoji')

        let custom = Util.parseEmoji(emoji)
        let emj = message.guild.emojis.cache.get(custom.id)

        if(custom.id){
            const img = new MessageAttachment(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`)
            return message.channel.send({ content: `**Name: **\`${emj.name}\`\n**ID: **\`${emj.id}\`\n**Created: **${moment(emj.createdTimestamp).format("LL")}`, files: [img] })
        } else {
            let parsed = parse(emoji, { assetType: "png" })
            if(!parsed[0]) return await message.channel.send('<:cross:873923620517347389> Invalid emoji')

            const img = new MessageAttachment(parsed[0].url)
            return await message.channel.send({ files: [img] })
        }
    }
}