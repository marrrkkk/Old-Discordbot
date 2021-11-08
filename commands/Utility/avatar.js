const {Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: ['av'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(m => m.user.username === args.join(' ')) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args.join(' ')) ||
        message.guild.members.cache.find(m => m.displayName === args.join(' ')) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args.join(' '))
        if(!args[0]) Member = message.member
        if(!Member) return message.channel.send(`Could't find member "${args.join(' ')}"`)

        const embed = new MessageEmbed()
        .setAuthor(Member.user.tag, Member.user.displayAvatarURL())
        .setImage(Member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor("RANDOM")

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}