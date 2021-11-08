const { Client, Message, MessageEmbed, MessageActionRow, MessageSelectMenu, Permissions, MessageButton } = require('discord.js')
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

        //nsfw help
        if(args[0] === 'nsfw'){
            if(!message.channel.nsfw){
                const er = new MessageEmbed()
                .setTitle('<:cross:873923620517347389> Error')
                .setDescription("<:channel_nsfw:873923620517322782> This command only works in a NSFW Channel")
                .setColor("RED")
    
                return message.channel.send({ embeds: [er] }).catch(er => console.log(er))
            } else {
                const nsfw = new MessageEmbed()
                .setTitle('🔞 NSFW commands')
                .setDescription(`\`\`\`fix
                \nanal           blowjob
                \nboobs          cum
                \nfeet           hentai
                \nlewd           trap
                \nwaifu-nsfw     yuri\`\`\``)
                .setColor('LUMINOUS_VIVID_PINK')
    
                return message.channel.send({ embeds: [nsfw] }).catch(e => console.log(e))
            }
        }

        //muterole
        let muterole = db.fetch(`muterole_${message.guild.id}`)
        const role = message.guild.roles.cache.get(muterole)
        let mr = `${role}`
        if(muterole === null) mr = 'Not set'

        //prefix
        let prefix = db.fetch(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = ","

        //serverlog
        let serverlog = db.fetch(`setlogs_${message.guild.id}`)
        const channel1 = message.guild.channels.cache.get(serverlog)
        let sl = `<a:toggleon:894633176738189384> ${channel1}`
        if(serverlog === null) sl = '<a:toggleoff:894633175890944030> Disabled'

        //messagelog
        let meslog = db.fetch(`setmeslogs_${message.guild.id}`)
        const channel2 = message.guild.channels.cache.get(meslog)
        let ml = `<a:toggleon:894633176738189384> ${channel2}`
        if(meslog === null) ml = '<a:toggleoff:894633175890944030> Disabled'

        //modlog
        let modlog = db.fetch(`setmodlogs_${message.guild.id}`)
        const channel3 = message.guild.channels.cache.get(modlog)
        let mdl = `<a:toggleon:894633176738189384> ${channel3}`
        if(modlog === null) mdl = '<a:toggleoff:894633175890944030> Disabled'

        //member log
        let memlog = db.fetch(`memlogs_${message.channel.id}`)
        const channel6 = message.guild.channels.cache.get(memlog)
        let mem = `<a:toggleon:894633176738189384> ${channel6}`
        if(memlog === null) mem = '<a:toggleoff:894633175890944030> Disabled'

        //anti-ghostping
        let gp = db.fetch(`anti-ghostping-${message.guild.id}`)
        let anti
        if(gp === true) anti = '<a:toggleon:894633176738189384> Enabled'
        if(gp === null) anti = '<a:toggleoff:894633175890944030> Disabled'

        //confession
        let cfs = db.fetch(`setcfs_${message.guild.id}`)
        const channel4 = message.guild.channels.cache.get(cfs)
        let cl = `<a:toggleon:894633176738189384> ${channel4}`
        if(cfs === null) cl = '<a:toggleoff:894633175890944030> Disabled'

        //suggestion
        let suggest= db.fetch(`suggestion_${message.guild.id}`)
        const channel5 = message.guild.channels.cache.get(suggest)
        let sgl = `<a:toggleon:894633176738189384> ${channel5}`
        if(suggest === null) sgl = '<a:toggleoff:894633175890944030> Disabled'

        const help = new MessageEmbed()
        .setTitle("Help Menu")
        .setDescription(`Prefix: \`${prefix}\``)
        .addField('__Config__', '*anti-ghostping, memberlog, messagelog, modlog, serverlog, setconfession, setprefix, suggestion*')
        .addField('__Moderation__', '*addrole, removerole, ban, kick, mute, warn, warning, clearwarn, unban, mute, unmute, lock, unlock*')
        .addField('__Entertainment__', '*ask, bite, blush, confess, cuddle, define, dog, echo, emoji, kiss, meme, pat, slap, snipe, spotify, waifu, help nsfw*')
        .addField('__Utility__', '*afk, avatar, bans, bots, help, emotes, inrole, invite, nsfw, ping, purge, roles, slowmode, suggest*')
        .addField('__Information__', '*botinfo, channelinfo, serverinfo, userinfo*')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        .setColor("BLURPLE")

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('help')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'All commands',
                    value: 'all',
                    emoji: '<:Partner:873923621129703465>'
                },
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
            ]),
        )

        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('home')
            .setLabel('Main Page')
            .setStyle('PRIMARY'),

            new MessageButton()
            .setCustomId('delete')
            .setLabel('Delete')
            .setStyle('DANGER'),

            new MessageButton()
            .setCustomId('news')
            .setLabel("What's new")
            .setEmoji("🎉")
            .setStyle('SUCCESS')
        )
        let msg = await message.channel.send({ embeds: [help], components: [row, row2] })
        const button = msg.createMessageComponentCollector({ componentType: 'BUTTON'})

        button.on('collect', async b => {
            if(b.user.id === message.author.id){
                if(b.customId === 'home'){
                    b.deferUpdate()
                    const embed = new MessageEmbed()
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
                    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("BLURPLE")

                    await msg.edit({ embeds: [embed] })
                } else if (b.customId === 'delete'){
                    msg.delete()
                } else if (b.customId === 'news'){
                    const embed = new MessageEmbed()
                    .setTitle("What's new 🎉 v6.0.0")
                    .setDescription(`\`\`\`- Added bans,roles,emoji,emotes and spotify command\n- Added Memberlog events\n- Merge mute and tempmute into one command\n- Improved Information commands\n- Improved AFK command\n- Added timeout on AFK removal\n- Fixed minor bugs\n- Added define command\n- Added 2 Context Menu\n- Added Slowmode Command\n- Added database for muterole\n\`\`\``)
                    .setColor('GREEN')

                    b.reply({ embeds: [embed], ephemeral: true })
                }
            } else {
                b.reply({ content: 'This button is not for you', ephemeral: true })
            }
        })


        //embeds

        const s = new MessageEmbed()
        .setTitle('<:developer:873923621482033212> Settings')
        .addField('anti-ghostping `on/off`', '<:reply:885439572996149288>Toggle anti-ghostping feature')
        .addField('messagelog', '<:reply:885439572996149288>Set the message log channel')
        .addField('serverlog', '<:reply:885439572996149288>Set the server log channel')
        .addField('memberlog', '<:reply:885439572996149288>Set the member log channel')
        .addField('confession', '<:reply:885439572996149288>Set the confession channel')
        .addField('setprefix', '<:reply:885439572996149288>Set the bot prefix')
        .addField('suggestion', '<:reply:885439572996149288>Set the suggestion channel')
        .setThumbnail('https://cdn.discordapp.com/attachments/882474976136007740/895017861624508426/config.png')
        .setColor('BLURPLE')

        const m = new MessageEmbed()
        .setTitle('<:blurplecertifiedmoderator:879212267470749746> Moderation')
        .addField('ban/unban', '<:reply:885439572996149288>Ban or Unban a member from the guild')
        .addField('kick', '<:reply:885439572996149288>Kick a member from the guild')
        .addField('muterole', '<:reply:885439572996149288>Set a muterole for the server')
        .addField('mute/unmute', '<:reply:885439572996149288>Mute or Unmute a member')
        .addField('warn/rwarn', '<:reply:885439572996149288>Give warning to user or Remove user warnings')
        .addField('warning', '<:reply:885439572996149288>Shows user current warnings')
        .addField('arole/rrole', '<:reply:885439572996149288>Add or Remove role to a member')
        .addField('lock/unlock', '<:reply:885439572996149288>Lock or Unlock a channel from the guild')
        .setThumbnail('https://cdn.discordapp.com/attachments/882474976136007740/895017867211333662/moderation.png')
        .setColor('BLURPLE')

        const u = new MessageEmbed()
        .setTitle('<:rules:880108679184130090> Utility')
        .addField('avatar', '<:reply:885439572996149288>Shows user avatar')
        .addField('afk', '<:reply:885439572996149288>set your AFK status')
        .addField('bans', '<:reply:885439572996149288>Get a list of all banned members from the guild')
        .addField('inrole', '<:reply:885439572996149288>List all members with a specific role')
        .addField('invite', '<:reply:885439572996149288>Send an invitation for the bot')
        .addField('nsfw', '<:reply:885439572996149288>Toggle nsfw channel settings')
        .addField('ping', '<:reply:885439572996149288>Shows how fast the bot respond')
        .addField('purge', '<:reply:885439572996149288>Bulkup delete messages')
        .addField('roles', '<:reply:885439572996149288>Get a list of all the roles from the guild')
        .addField('slowmode', 'Set the slowmode for the channel')
        .addField('suggest', '<:reply:885439572996149288>Send a suggestion in suggestion channel')
        .setThumbnail('https://cdn.discordapp.com/attachments/882474976136007740/895017861624508426/config.png')
        .setColor('BLURPLE')

        const f = new MessageEmbed()
        .setTitle('<:blurpleannouncements:879212267588182086>Entertainment')
        .addField('ask', '<:reply:885439572996149288>Ask the bot a random question')
        .addField('dog', '<:reply:885439572996149288>Send a random picture of a dog')
        .addField('define', '<:reply:885439572996149288>Search up a word in urban dictionary')
        .addField('echo', '<:reply:885439572996149288>Send a message in specific channel')
        .addField('emoji', '<:reply:885439572996149288>Get a png/gif copy of selected emoji')
        .addField('emote', '<:reply:885439572996149288>Get a list all emojis from the guild')
        .addField('level', '<:reply:885439572996149288>Show your current level')
        .addField('meme', '<:reply:885439572996149288>Send a random meme from reddit')
        .addField('snipe', '<:reply:885439572996149288>Snipe upto 5 recently deleted messages(including image)')
        .addField('spotify', '<:reply:885439572996149288>Show your current song in spotify')
        .addField('waifu', '<:reply:885439572996149288>Send a random waifu picture')
        .addField('confess', '<:reply:885439572996149288>Send an anonymous confession using slash command or by DM')
        .addField('List of action commands: ', '`bite`,`blush`,`cuddle`,`kiss`,`pat`,`slap`')
        .setFooter('For NSFW, do help nsfw')
        .setThumbnail('https://cdn.discordapp.com/attachments/882474976136007740/895017864141111316/fun.png')
        .setColor('BLURPLE')

        const i = new MessageEmbed()
        .setTitle('<:info:879212267521056818>Information Command')
        .addField('botinfo', '<:reply:885439572996149288>Information about the bot')
        .addField('roleinfo', '<:reply:885439572996149288>Get the information about the role')
        .addField('serverinfo', '<:reply:885439572996149288>Get the information about the server')
        .addField('userinfo', '<:reply:885439572996149288>Get the information about the user')
        .setThumbnail('https://cdn.discordapp.com/attachments/882474976136007740/895017866003357696/information.png')
        .setColor('BLURPLE')

        const o = new MessageEmbed()
        .setAuthor('Overview', client.user.displayAvatarURL())
        .setDescription(`Prefix: \`${prefix}\`\nMuterole: ${mr}`)
        .addField('Serverlog', sl, true)
        .addField('Messagelog', ml, true)
        .addField('Modlog', mdl, true)
        .addField('Memberlog', mem, true)
        .addField('Anti-Ghostping', anti, true)
        .addField('Confession', cl, true)
        .addField('Suggestion', sgl, true)
        .setThumbnail('https://cdn.discordapp.com/attachments/882474976136007740/895017868519960596/overview.png')
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
                if(value === 'all'){
                    msg.edit({ embeds: [help] })
                }
            } else {
                collected.reply({ content: 'This menu is not for you', ephemeral: true})
            }
        })
    }
}