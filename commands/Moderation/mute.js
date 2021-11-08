const { Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const ms = require('ms')

module.exports = {
    name: 'mute',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let prefix = await db.get(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = ','
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing Permission: `MANGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(2).join(' ')
        if(!args[0]) return message.reply({ content: "Please specify someone to mute", allowedMentions:{repliedUsers:false}})
        if(!Member) return message.channel.send(`Couldn't find member "${args[0]}"`)
        if(!reason) reason = 'No reason specified'

        const role = db.get(`muterole_${message.guild.id}`)
        if(role === null) return message.channel.send(`<:cross:873923620517347389> Muterole is not setup, to set one do \`${prefix}muterole\``)

        const muteEmbed = new MessageEmbed()
        .setDescription(`🔇**${Member.displayName}** has been muted`)
        .setColor("RED")

        if(Member.roles.cache.get(role)) return message.reply({ content: `**${Member.displayName}** is already muted`, allowedMentions: false })
        await Member.roles.add(role).catch(e => console.log(e))
        message.channel.send({ embeds: [muteEmbed] }).catch(e => console.log(e))

        let mute2 = db.get(`setmodlogs_${message.guild.id}`)
        if(mute2 === null){
            return;
        }
        const Membed2 = new MessageEmbed()
        .setAuthor(Member.user.tag, Member.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Muted`)
        .addField(`Member`, `<@${Member.user.id}>`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${Member.user.id}`)
        .setColor("LUMINOUS_VIVID_PINK")

        try {
            await client.channels.cache.get(mute2).send({ embeds: [Membed2] })
        } catch (error) {
            console.log(error)
        }
    }
}