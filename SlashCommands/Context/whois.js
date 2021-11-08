const { Client, ContextMenuInteraction, MessageActionRow, MessageButton, Permissions, MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'Whois',
    type: 'USER',

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        const member = await interaction.guild.members.cache.get(interaction.targetId)

        try {
            const { guild } = interaction
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('more')
                .setLabel('More')
                .setStyle('PRIMARY')
            )
    
            let role = member.roles.cache.filter((roles) => roles.id !== interaction.guild.id).map((role) => role.toString())
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
            .setDescription(`${member}`)
            .addField(`Created: `, `${moment(member.user.createdAt).format("LL")}`, true)
            .addField(`Joined Server: `, `${moment(member.joinedAt).format("LL")}`, true)
            .addField(`Roles`, `${role}`)
            .addField(`Key Permission`, `${perm}`)
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setColor(member.displayColor)
            .setFooter(`User ID: ${member.user.id}`)
    
            if(member.presence){ 
                let status
                if(member.presence.status === 'online') status = '<:online:880155848284995634>'
                if(member.presence.status === 'idle') status = '<:discordidle:894588313741168660>'
                if(member.presence.status === 'dnd') status = '<:discorddnd:894588389624532993>'
                const devices = member.presence?.clientStatus || {}
                const description = () => {
                    const entries = Object.entries(devices)
                    .map(
                        (value) => 
                           `${value[0][0].toUpperCase()}${value[0].slice(1)}`
                    )
                    .join(',');
                    return `**Device:** ${entries}`
                }
    
                embed.addField('Status', `${description()} ${status}`)
    
                if(member.presence.activities.length === 0){
                    embed.addField('Activity', 'None')
                    return interaction.followUp({ embeds: [embed] })
                }

                const activity= member.presence.activities[0]
    
                let type
                if(activity.type === 'PLAYING') type = 'Playing'
                if(activity.type === 'LISTENING') type = 'Listening to'
                if(activity.type === 'WATCHING') type = 'Watching'
                if(activity.type === 'STREAMING') type = 'Streaming'
                if(activity.type === 'COMPETING') type = 'Competing'
                if(activity.name === 'Spotify'){
                    embed.addField('Activity', `${type} ${activity.name}\n**Song:** ${activity.details}\n**Artist:** ${activity.state}\n**Album:** ${activity.assets.largeText}`)
                } else if (activity.name === 'YouTube'){
                    embed.addField('Activity', `${type} ${activity.name}\n**Title:** ${activity.details}\n**Channel:** ${activity.state}`)
                } else if (activity.name === 'Custom Status') {
                    if(activity.emoji){
                        embed.addField('Activity', `${activity.name}\n**Details:** ${activity.state}\n**Emoji:** ${activity.emoji.name}`)
                    } else {
                        embed.addField('Activity', `${activity.name}\n**Details:** ${activity.state}`)
                    }
                } else if(!activity.details) {
                    embed.addField('Activity', `${type} ${activity.name}`)
                } else if (!activity.state) {
                    embed.addField('Activity', `${activity.name}\n**Details:** ${activity.details}`)
                } else {
                    embed.addField('Activity', `${activity.name}\n**Details:** ${activity.details}\n**State:** ${activity.state}`)
                }

                return await interaction.followUp({ embeds: [embed] }).catch(e => console.log(e))

            } else {
                embed.addField('Other', `Activity: Offline <:offline:880155848473714688>`)
                return await interaction.followUp({ embeds: [embed] }).catch(e => console.log(e))
            }
        } catch (error) {
            console.log(error)
        }
    }
}