const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'emotes',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let array = []
        message.guild.emojis.cache.forEach(e => array.push(`${e}`))

        const embed = new MessageEmbed()
        .setAuthor(`Emojis for ${message.guild.name} | ${message.guild.emojis.cache.filter(e => !e.animated).size} Normal, ${message.guild.emojis.cache.filter(e => e.animated).size} Animated`, message.guild.iconURL())
        .setDescription(array.join(" "))

        await message.channel.send({ embeds: [embed] })
    }
}