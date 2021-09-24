const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu, Permissions } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'help',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const channel = message.channel;
        const botPermissionsIn = message.guild.me.permissionsIn(channel);
        if(!botPermissionsIn.has([
            Permissions.FLAGS.EMBED_LINKS,
        ])) return message.channel.send('<:cross:873923620517347389> Missing Permission: `EMBED_LINKS`')

        //prefix
        let prefix = db.fetch(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = ","

        //serverlog
        let serverlog = db.fetch(`setlogs_${message.guild.id}`)
        const channel1 = client.channels.cache.get(serverlog)
        let sl = `<:online:880155848284995634> ${channel1}`
        if(serverlog === null) sl = '<:offline:880155848473714688> Disabled'

        //messagelog
        let meslog = db.fetch(`setmeslogs_${message.guild.id}`)
        const channel2 = client.channels.cache.get(meslog)
        let ml = `<:online:880155848284995634> ${channel2}`
        if(meslog === null) ml = '<:offline:880155848473714688> Disabled'

        //modlog
        let modlog = db.fetch(`setmodlogs_${message.guild.id}`)
        const channel3 = client.channels.cache.get(modlog)
        let mdl = `<:online:880155848284995634> ${channel3}`
        if(modlog === null) mdl = '<:offline:880155848473714688> Disabled'

        //anti-ghostping
        let gp = db.fetch(`anti-ghostping-${message.guild.id}`)
        let anti
        if(gp === true) anti = '<:online:880155848284995634> Enabled'
        if(gp === null) anti = '<:offline:880155848473714688> Disabled'

        //confession
        let cfs = db.fetch(`setcfs_${message.guild.id}`)
        const channel4 = client.channels.cache.get(cfs)
        let cl = `<:online:880155848284995634> ${channel4}`
        if(cfs === null) cl = '<:offline:880155848473714688> Disabled'

        //suggestion
        let suggest= db.fetch(`suggestion_${message.guild.id}`)
        const channel5 = client.channels.cache.get(suggest)
        let sgl = `<:online:880155848284995634> ${channel5}`
        if(suggest === null) sgl = '<:offline:880155848473714688> Disabled'

        const help = new MessageEmbed()
        .setTitle("Help Menu")
        .setDescription(`Prefix: \`${prefix}\``)
        .addField('Categories:', `
        <:developer:873923621482033212> **Settings**\n<:reply:885439572996149288> Configure log channels and bot prefix
        \n<:blurplecertifiedmoderator:879212267470749746> **Moderation**\n<:reply:885439572996149288> Moderate members and manage roles 
        \n<:rules:880108679184130090> **Utility**\n<:reply:885439572996149288> Utilities and other commands
        \n<:blurpleannouncements:879212267588182086> **Fun**\n<:reply:885439572996149288> For entertainment and images
        \n<:info:879212267521056818> **Infomation**\n<:reply:885439572996149288>Information commands about the guild
        \n<:bell:890814636750946345> **Overview**\n<:reply:885439572996149288>Overview for bot configuration
        `)
        .setColor("BLURPLE")

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('help')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'Config',
                    value: 'set',
                    emoji: '<:developer:873923621482033212>'
                },
                {
                    label: 'Moderation',
                    value: 'mod',
                    emoji: '<:blurplecertifiedmoderator:879212267470749746>'
                },
                {
                    label: 'Utility',
                    value: 'util',
                    emoji: '<:rules:880108679184130090>'
                },
                {
                    label: 'Entertainment',
                    value: 'fun',
                    emoji: '<:blurpleannouncements:879212267588182086>'
                },
                {
                    label: 'Information',
                    value: 'info',
                    emoji: '<:info:879212267521056818>'
                },
                {
                    label: 'Overview',
                    value: 'overview',
                    emoji: '<:bell:890814636750946345>'
                }
            ])
        )
        let msg = await message.channel.send({ embeds: [help], components: [row] }).catch(e => console.log(e))

        //embeds

        const s = new MessageEmbed()
        .setTitle('<:developer:873923621482033212> Settings')
        .addField('anti-ghostping `on/off`', '<:reply:885439572996149288>Toggle anti-ghostping feature')
        .addField('messagelog', '<:reply:885439572996149288>Set the message log channel')
        .addField('serverlog', '<:reply:885439572996149288>Set the server log channel')
        .addField('confession', '<:reply:885439572996149288>Set the confession channel')
        .addField('setprefix', '<:reply:885439572996149288>Set the bot prefix')
        .addField('suggestion', '<:reply:885439572996149288>Set the suggestion channel')
        .setColor('BLURPLE')

        const m = new MessageEmbed()
        .setTitle('<:blurplecertifiedmoderator:879212267470749746> Moderation')
        .addField('ban/unban', '<:reply:885439572996149288>Ban or Unban a member from a guild')
        .addField('kick', '<:reply:885439572996149288>Kick a member from the guild')
        .addField('mute/unmute', '<:reply:885439572996149288>Mute or Unmute a member')
        .addField('tempmute', '<:reply:885439572996149288>Temporarily mute a member')
        .addField('warn/rwarn', '<:reply:885439572996149288>Give warning to user or Remove user warnings')
        .addField('warning', '<:reply:885439572996149288>Shows user current warnings')
        .addField('arole/rrole', '<:reply:885439572996149288>Add or Remove role to a member')
        .addField('lock/unlock', '<:reply:885439572996149288>Lock or Unlock a channel from the guild')
        .setColor('BLURPLE')

        const u = new MessageEmbed()
        .setTitle('<:rules:880108679184130090> Utility')
        .addField('avatar', '<:reply:885439572996149288>Shows user avatar')
        .addField('afk', '<:reply:885439572996149288>set your AFK status')
        .addField('inrole', '<:reply:885439572996149288>List all members with a specific role')
        .addField('invite', '<:reply:885439572996149288>Send an invitation for the bot')
        .addField('nsfw', '<:reply:885439572996149288>Toggle nsfw channel settings')
        .addField('ping', '<:reply:885439572996149288>Shows how fast the bot respond')
        .addField('purge', '<:reply:885439572996149288>Bulkup delete messages')
        .addField('remind', '<:reply:885439572996149288>Set a reminder')
        .addField('suggest', '<:reply:885439572996149288>Send a suggestion in suggestion channel')
        .setColor('BLURPLE')

        const f = new MessageEmbed()
        .setTitle('<:blurpleannouncements:879212267588182086>Entertainment')
        .addField('ask', '<:reply:885439572996149288>Ask the bot a random question')
        .addField('dog', '<:reply:885439572996149288>Send a random picture of a dog')
        .addField('echo', '<:reply:885439572996149288>Send a message in specific channel')
        .addField('level', '<:reply:885439572996149288>Show your current level')
        .addField('meme', '<:reply:885439572996149288>Send a random meme from reddit')
        .addField('snipe', '<:reply:885439572996149288>Snipe upto 5 recently deleted messages(including image)')
        .addField('waifu', '<:reply:885439572996149288>Send a random waifu picture')
        .addField('/confess', '<:reply:885439572996149288>Send an anonymous confession using slash command')
        .addField('List of action commands: ', '`bite`,`blush`,`cuddle`,`kiss`,`pat`,`slap`')
        .setFooter('For NSFW, do help-nsfw')
        .setColor('BLURPLE')

        const i = new MessageEmbed()
        .setTitle('<:info:879212267521056818>Information Command')
        .addField('botinfo', '<:reply:885439572996149288>Information about the bot')
        .addField('roleinfo', '<:reply:885439572996149288>Get the information about the role')
        .addField('serverinfo', '<:reply:885439572996149288>Get the information about the server')
        .addField('userinfo', '<:reply:885439572996149288>Get the information about the user')
        .setColor('BLURPLE')

        const o = new MessageEmbed()
        .setAuthor('Overview', client.user.displayAvatarURL())
        .setTitle(`Prefix: \`${prefix}\``)
        .setDescription(`**Serverlog:** ${sl}\n**Messagelog:** ${ml}\n**Modlog:** ${mdl}\n**Anti-Ghostping:** ${anti}\n**Confession:** ${cl}\n**Suggestion:** ${sgl}`)
        .setColor('BLURPLE')

        const collector = msg.createMessageComponentCollector({
            componentType: 'SELECT_MENU'
        })

        collector.on('collect', async (collected) => {
            const value = collected.values[0]

            if(collected.user.id === message.author.id){
                collected.deferUpdate()

                if(value === 'set'){
                    msg.edit({embeds: [s] })
                }
                if(value === 'mod'){
                    msg.edit({embeds: [m] })
                }
                if(value === 'util'){
                    msg.edit({embeds: [u] })
                }
                if(value === 'fun'){
                    msg.edit({embeds: [f] })
                }
                if(value === 'info'){
                    msg.edit({embeds: [i] })
                }
                if(value === 'overview'){
                    msg.edit({ embeds: [o] })
                }
            } else {
                collected.reply({ content: 'This menu is not for you', ephemeral: true})
            }
        })
    }
}