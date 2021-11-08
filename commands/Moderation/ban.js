const { Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'ban',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("<:cross:873923620517347389>  Missing Permission: `BAN_MEMBERS`")
        if(!message.member.permissions.has("BAN_MEMBERS")) return

        let reason = args.slice(1).join(" ")
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        

        if(!reason) reason = "No reason given"
        if(!args[0]) return message.reply({ content: 'Please specify someone to ban', allowedMentions: {repliedUser:false} })
        if(!mentionedMember) return message.channel.send(`Couldn't find member "${args[0]}""`)
        if(mentionedMember.id === message.author.id) return message.channel.send("You can't ban yourself.")
        if(!mentionedMember.bannable) return message.channel.send('<:cross:873923620517347389> Unable to ban that member')
        if(message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send('<:cross:873923620517347389> Unable to ban someone higher or the same role as you')

        const banEmbed = new MessageEmbed()
        .setDescription(`<:notcheck:879227321154932746> ・ Banned **${mentionedMember.user.tag}**`)
        .setColor("RED")

        await mentionedMember.send(`You have been banned from **${message.guild.name}**\nReason: **${reason}**`).catch(err => console.log(err))
        await mentionedMember.ban({
            days: 7,
            reason: reason
        }).catch(err => console.log(err)).then(() => message.channel.send({ embeds: [banEmbed] })).catch(e => console.log(e))

        let banlog = db.get(`setmodlogs_${message.guild.id}`)
        if(banlog === null){
            return;
        }
        const embed = new MessageEmbed()
        .setAuthor(mentionedMember.user.tag, mentionedMember.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Banned`)
        .addField(`Member`, `<@${mentionedMember.user.id}>`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${mentionedMember.user.id}`)
        .setColor("RED")

        try {
            await client.channels.cache.get(banlog).send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}