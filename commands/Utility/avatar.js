const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "avatar",
    aliases: ['av'],

    async run (client, message, args){
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        const embed = new MessageEmbed()
        .setTitle(`${Member.user.username}'s Avatar`)
        .setImage(Member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor("RANDOM")
        .setFooter(`Requested by: ${message.author.username}`)

        try {
            await message.channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}