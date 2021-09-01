const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "ban",
    description: "ban a user",

    async run (client, message, args){
        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("You don't have permission to use this command")
        .setFooter("Require BAN MEMBERS permission")
        .setColor("RED")
        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("<:cross:873923620517347389>  Missing Permission: `BAN_MEMBERS`")
        if(!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send({ embeds: [errr]})

        let reason = args.slice(1).join(" ")
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        

        if(!reason) reason = "No reason given"
        if(!args[0]) return message.reply({ content: "Please specify someone to ban", allowedMentions: {repliedUsers: false}})
        if(!mentionedMember) return message.reply({ content: "Couldn't find that member", allowedMentions: {repliedUsers: false}})
        if(mentionedMember.id === message.author.id) return message.reply({ content: "You can't ban yourself", allowedMentions:{repliedUsers:false}})
        if(!mentionedMember.kickable) return message.reply({ content: "Unable to ban member", allowedMentions: {repliedUsers: false}})
        if(message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.reply({ content: "Unable to ban someone higher or the same role as you", allowedMentions:{repliedUsers:false}})

        const banEmbed = new MessageEmbed()
        .setDescription(`<:notcheck:879227321154932746> ・ Banned **${mentionedMember.user.tag}**`)
        .setColor("RED")

        await mentionedMember.send(`You have been banned from **${message.guild.name}**\nReason: **${reason}**`).catch(err => console.log(err))
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send({ embeds: [banEmbed] }))

        let banlog = db.get(`setmodlogs_${message.guild.id}`)
        if(banlog === null){
            return;
        }
        const bembed = new MessageEmbed()
        .setAuthor(mentionedMember.user.tag, mentionedMember.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Banned`)
        .addField(`Member`, `<@${mentionedMember.user.id}>`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${mentionedMember.user.id}`)
        .setColor("RED")

        try {
            await client.channels.cache.get(banlog).send({ embeds: [bembed] })
            
        } catch (error) {
            
        }

    }
}