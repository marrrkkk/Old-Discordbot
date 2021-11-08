const {Client, Message, MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js')
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
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('more')
            .setLabel('More')
            .setStyle('PRIMARY')
        )

        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || 
        message.guild.members.cache.find(m => m.user.username === args.join(' ')) || message.guild.members.cache.find(m => m.user.username.toLowerCase() === args.join(' ')) ||
        message.guild.members.cache.find(m => m.displayName === args.join(' ')) || message.guild.members.cache.find(m => m.displayName.toLowerCase() === args.join(' '))
        if(!args[0]) user = message.member
        if(!user) return message.channel.send(`Couldn't find member "${args.join(' ')}"`)

        const member = guild.members.cache.get(user.id)

        let role = member.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString())
        if(role.length === 0) role = "No roles to display"
        if(role.length > 20) role = "Too many roles to display"
        
        let perm = []
        if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) perm.push("Administrator")
        if(member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) perm.push("Kick Members")
        if(member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) perm.push("Ban Members")
        if(member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) perm.push("Manage Server")
        if(member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) perm.push("Manage Channels")
        if(member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) perm.push("Manage Messages")
        if(member.permissions.has(Permissions.FLAGS.MANAGE_NICKNAMES)) perm.push("Manage Nickname")
        if(member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) perm.push("Manage Roles")

        let map = perm.map(x => x).join(',')

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField(`Created: `, `${moment(member.user.createdAt).format("LL")}`, true)
        .addField(`Joined Server: `, `${moment(member.joinedAt).format("LL")}`, true)
        .addField(`Roles`, `${role}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor(member.displayColor)
        .setFooter(`User ID: ${member.user.id}`)

        if(guild.ownerId === member.id){
            embed.setDescription(`<:serverowner:879327553695916092> ${member}`)
        } else if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)){
            embed.setDescription(`<:modshield:879212267856617473> ${member}`)
        } else {
            embed.setDescription(`${member}`)
        }

        if(map.length !== 0){
            embed.addField(`Permissions`, `${map}`)
        }

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
                return message.channel.send({ embeds: [embed] })
            }

            if(member.presence.activities.length > 1){

                const activity = member.presence.activities[0]

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

                let msg = await message.channel.send({ embeds: [embed], components: [row] })
                const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'});

                collector.on('collect', async b => {
                    b.deferUpdate()
                    if(b.user.id === message.author.id){
                        if(b.customId === 'more'){
                            const row2 = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setCustomId('back')
                                .setLabel('Back')
                                .setStyle('SECONDARY')
                            )
                            const more = new MessageEmbed()
                            .setColor(member.displayColor)
                            member.presence.activities.forEach((activity) => {
                                let type
                                if(activity.type === 'PLAYING') type = 'Playing'
                                if(activity.type === 'LISTENING') type = 'Listening to'
                                if(activity.type === 'WATCHING') type = 'Watching'
                                if(activity.type === 'STREAMING') type = 'Streaming'
                                if(activity.type === 'COMPETING') type = 'Competing'
                                if(activity.name === 'Spotify'){
                                    more.addField('Activity', `${type} ${activity.name}\n**Song:** ${activity.details}\n**Artist:** ${activity.state}\n**Album:** ${activity.assets.largeText}`)
                                } else if (activity.name === 'YouTube'){
                                    more.addField('Activity', `${type} ${activity.name}\n**Title:** ${activity.details}\n**Channel:** ${activity.state}`)
                                } else if (activity.name === 'Custom Status'){
                                    if(activity.emoji){
                                        more.addField('Activity', `${activity.name}\n**Details:** ${activity.state}\n**Emoji:** ${activity.emoji.name}`)
                                    } else {
                                        more.addField('Activity', `${activity.name}\n**Details:** ${activity.state}`)
                                    }
                                } else if (!activity.details) {
                                    more.addField('Activity', `${type} ${activity.name}`)
                                } else if (!activity.state){
                                    more.addField('Activity', `${type} ${activity.name}\n**Details:** ${activity.details}`)
                                } else {
                                    more.addField('Activity', `${type} ${activity.name}\n**Details:** ${activity.details}\n**State:** ${activity.state}`)
                                }
                            })

                            let msg2 = await msg.edit({ embeds: [more], components: [row2] })
                            const collector2 = msg.createMessageComponentCollector({ componentType: 'BUTTON'});

                            collector2.on('collect', async c => {
                                if(c.user.id === message.author.id){
                                    if(c.customId === 'back'){
                                        await msg.edit({ embeds: [embed], components: [row] })
                                    }
                                }
                            })
                        }
                    }
                })
            } else {
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

                return await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            }
        } else {
            embed.addField('Activity', `Offline <:offline:880155848473714688>`)
            return await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
        }
    }
}