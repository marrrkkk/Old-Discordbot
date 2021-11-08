const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'kick',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("You don't have permission to use this command")
        .setFooter("Require KICK MEMBERS permission")
        .setColor("RED")
        if(!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("<:cross:873923620517347389>  Missing Permission: `KICK_MEMBERS`")
        if(!message.member.permissions.has("KICK_MEMBERS")) return

        let reason = args.slice(1).join(" ")
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!reason) reason = "No reason given"
        if(!args[0]) return message.reply({ content: 'Please specify someone to kick', allowedMentions: {repliedUser:false} })
        if(!mentionedMember) return message.channel.send(`Couldn't find member "${args[0]}""`)
        if(mentionedMember.id === message.author.id) return message.channel.send("You can't kick yourself")
        if(!mentionedMember.kickable) return message.channel.send('<:cross:873923620517347389> Unable to kick that member')
        if(message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('Unable to kick someone higher or the same role as you')

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
        
        const embed = new MessageEmbed()
        .setAuthor(mentionedMember.user.tag, mentionedMember.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Kicked`)
        .addField(`Member`, `<@${mentionedMember.user.id}>`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${mentionedMember.user.id}`)
        .setColor("YELLOW")

        try {
            await client.channels.cache.get(kicklog).send({ embeds: [embed] })           
        } catch (error) {
            console.log(error)
        }
    }
}