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
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const embed = new MessageEmbed()
        .setAuthor(Member.user.tag, Member.user.displayAvatarURL())
        .setImage(Member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor("RANDOM")

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}