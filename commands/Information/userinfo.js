const { MessageEmbed, Permissions, UserFlags, MessageActionRow, MessageButton } = require("discord.js");

const moment = require('moment')

module.exports = {
    name: "userinfo",
    aliases: ['whois'],

    async run (client, message, args){
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('ui')
            .setLabel('More')
            .setEmoji('<:info:879212267521056818>')
            .setStyle('SECONDARY')
        )
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
        const member = guild.members.cache.get(user.id)
        let status = member.presence.status
        const devices = member.presence?.clientStatus || {}
        const description = () => {
            const entries = Object.entries(devices)
            .map(
                (value, index) => 
                   `${
                       index + 1
                   }) ${value[0][0].toUpperCase()}${value[0].slice(1)}`
            )
            .join('\n');
            return `Devices:\n${entries}`
        }
        let role = member.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString())
        if(role.length === 0) role = "No roles to display"
        if(role.length > 20) role = "Too many roles to display"
        
        let perm = "<:members:879808046321246258> Member"
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) perm = '<:rules:880108679184130090> Kick Members'
        if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) perm = '<:rules:880108679184130090> Ban Members'
        if(member.permissions.has([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])) perm = '<:rules:880108679184130090> Kick/Ban Members'
        if(member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) perm = '<:developer:873923621482033212> Manage Server'
        if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) perm = '<:blurplecertifiedmoderator:879212267470749746> Administrator'

        if(status === 'online') status = '<:online:880155848284995634> Online'
        if(status === 'idle') status = '<:idle:880155848041701387> Idle'
        if(status === 'dnd') status = '<:dnd:880155848364658809> Do not Disturb'
        if(status === 'offline') status = '<:offline:880155848473714688> Offline'

        const userEmbed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField('Username', `${member.user.username}`, true)
        .addField(`Created: `, `${moment(member.user.createdAt).format("LL")}`, true)
        .addField(`Joined Server: `, `${moment(member.joinedAt).format("LL")}`, true)
        .addField(`Roles`, `${role}`, true)
        .addField(`Key Permission`, `${perm}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        .setFooter(`User ID: ${member.user.id}`)

        try {
            let msg = await message.channel.send({ embeds: [userEmbed], components: [row] });
            const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'});

            collector.on('collect', i => {
                const more = new MessageEmbed()
                .setDescription(`${description()}\n\nStatus:\n${status}`)
                .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                .setColor('GREY')
                if(i.user.id === message.author.id){
                    i.reply({ embeds: [more] , ephemeral: true})
                } else {
                    i.reply({ content: 'This button is not for you', ephemeral: true})
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}