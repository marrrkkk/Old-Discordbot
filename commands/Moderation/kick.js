const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "kick",
    description: "kick a user",

    async run (client, message, args){
        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("You don't have permission to use this command")
        .setFooter("Require KICK MEMBERS permission")
        .setColor("RED")
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("<:cross:873923620517347389>  Missing Permission: `KICK_MEMBERS`")
        if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send({ embeds: [errr] }).catch(e => console.log(e))

        let reason = args.slice(1).join(" ")
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!reason) reason = "No reason given"
        if(!args[0]) return message.reply({ content: "Please specify someone to kick", allowedMentions: {repliedUsers: false}})
        if(!mentionedMember) return message.reply({ content: "Couldn't find that member", allowedMentions: {repliedUsers: false}})
        if(mentionedMember.id === message.author.id) return message.reply({ content: "You can't kick yourself", allowedMentions:{repliedUsers:false}})
        if(!mentionedMember.kickable) return message.reply({ content: "Unable to kick member", allowedMentions: {repliedUsers: false}})
        if(message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.reply({ content: "Unable to kick someone higher or the same role as you", allowedMentions:{repliedUsers:false}})

        const kickEmbed = new MessageEmbed()
        .setDescription(`<:blurplecertifiedmoderator:879212267470749746> ・ Kicked **${mentionedMember.user.tag}**`)
        .setColor("BLURPLE")

        await mentionedMember.send(`You have been kicked from **${message.guild.name}**\nReason: **${reason}**`).catch(err => console.log(err))
        await mentionedMember.kick({
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send({ embeds: [kickEmbed] })).catch(e => console.log(e))

        let kicklog = db.get(`setmodlogs_${message.guild.id}`)
        if(kicklog === null){
            null
        }
        const kembed = new MessageEmbed()
        .setAuthor(mentionedMember.user.tag, mentionedMember.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Kicked`)
        .addField(`Member`, `<@${mentionedMember.user.id}>`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${mentionedMember.user.id}`)
        .setColor("YELLOW")

        try {
            await client.channels.cache.get(kicklog).send({ embeds: [kembed] })           
        } catch (error) {
            console.log(error)
        }
    }
}