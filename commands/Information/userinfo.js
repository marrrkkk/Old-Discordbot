const {Client, Message, MessageEmbed, Permissions } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'userinfo',
    aliases: ['whois'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const { guild } = message

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
        const member = guild.members.cache.get(user.id)

        let role = member.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString())
        if(role.length === 0) role = "No roles to display"
        if(role.length > 20) role = "Too many roles to display"
        
        let perm = "<:members:879808046321246258> Member"
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) perm = '<:rules:880108679184130090> Kick Members'
        if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) perm = '<:rules:880108679184130090> Ban Members'
        if(member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) perm = '<:rules:880108679184130090> Kick/Ban Members'
        if(member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) perm = '<:developer:873923621482033212> Manage Server'
        if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) perm = '<:blurplecertifiedmoderator:879212267470749746> Administrator'
        if(guild.ownerId === member.user.id) perm = '<:serverowner:879327553695916092> Server Owner'

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField('Username', `${member.user.username}`)
        .addField(`Created: `, `${moment(member.user.createdAt).format("LL")}`, true)
        .addField(`Joined Server: `, `${moment(member.joinedAt).format("LL")}`, true)
        .addField(`Roles`, `${role}`)
        .addField(`Key Permission`, `${perm}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        .setFooter(`User ID: ${member.user.id}`)

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}