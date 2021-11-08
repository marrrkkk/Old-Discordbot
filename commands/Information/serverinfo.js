const {Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'serverinfo',
    aliases: ['server'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('feat')
            .setPlaceholder('Filter')
            .addOptions([
                {
                    label: 'Overview',
                    value: 'home',
                    emoji: '<:modshield:879212267856617473>'
                },
                {
                    label: 'Settings',
                    value: 'set',
                    emoji: '⚙'
                },
                {
                    label: 'Channels',
                    value: 'channel',
                    emoji: '<:channel:873923621037436968>'
                },
                {
                    label: 'Roles',
                    value: 'role',
                    emoji: '<:atsign:879212267315544085>'
                },
                {
                    label: 'Limits',
                    value: 'limit',
                    emoji: '<:6417_ModMute:879212267097456692>'
                },
                {
                    label: 'Features',
                    value: 'feat',
                    emoji: '<:early_support:873923621318443118>'
                },
            ])
        )

        const guild = message.guild;
        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, guild.iconURL())
        .setThumbnail(message.guild.iconURL())
        .addField("<:serverowner:879327553695916092> Owner", `<@${guild.ownerId}>`)
        .addField("Channels", `${guild.channels.cache.filter((ch) => ch.type === 'GUILD_CATEGORY').size} Category\n<:channel:873923621037436968> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\n<:VC:873923621100335155> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}`, true)
        .addField("Members", `<:members:879808046321246258> ${guild.members.cache.filter((member) => !member.user.bot).size} Users\n<:Bot:873923621247127612> ${guild.members.cache.filter((member) => member.user.bot).size} Bots\n<:notcheck:879227321154932746> ${(await message.guild.bans.fetch()).size} Banned\nTotal: ${guild.memberCount} Members`, true)
        .addField("Stats", `<:atsign:879212267315544085> ${guild.roles.cache.size} Roles\n<:early_support:873923621318443118> ${guild.emojis.cache.size} Emojis\n<:Bug_hunter:876375936319258624> ${guild.stickers.cache.size} Stickers\n<:s_booster:873923620731228160> ${guild.premiumSubscriptionCount} Booster`, true)
        .addField("Other", `<:modshield:879212267856617473> Verification: **${guild.verificationLevel}**\n<:channel_nsfw:873923620517322782> NSFW: **${guild.nsfwLevel}**\n<:link:879811047857487922> Vanity URL: **${guild.vanityURLCode || "None"}**`)
        .setFooter(`ID: ${message.guild.id} \nCreated: ${moment(guild.createdTimestamp).format("LL")}`)
        .setColor('#2f3136')

        try {
            let msg = await message.channel.send({ embeds: [embed], components: [row] })
            const collector = msg.createMessageComponentCollector({
                componentType: 'SELECT_MENU'
            })

            collector.on('collect', async b => {
                const value = b.values[0]
                if(b.user.id === message.author.id){
                    b.deferUpdate()
                    if(value === 'feat'){
                        const feat = guild.features.map((f) => `\n- ${f}`)
                        const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, guild.iconURL())
                        .setThumbnail(message.guild.iconURL())
                        .setTitle('Features')
                        .setDescription(`\`\`\`${feat}\`\`\``)
                        .setColor('#2f3136')

                        await msg.edit({ embeds: [embed] })
                    } else if (value === 'channel'){
                        const ch = guild.channels.cache.size
                        const ct = guild.channels.cache.filter(ct => ct.type === 'GUILD_CATEGORY').size
                        const tc = guild.channels.cache.filter(t => t.type === 'GUILD_TEXT').size
                        const vc = guild.channels.cache.filter(v => v.type === 'GUILD_VOICE').size
                        const ac = guild.channels.cache.filter(a => a.type === 'GUILD_NEWS').size
                        const tr = guild.channels.cache.filter(tr => tr.type === 'GUILD_PRIVATE_THREAD').size + guild.channels.cache.filter(th => th.type === 'GUILD_PUBLIC_THREAD').size
                        const pth = guild.channels.cache.filter(ptr => ptr.type === 'GUILD_PUBLIC_THREAD').size
                        const ptr = guild.channels.cache.filter(pth => pth.type === 'GUILD_PRIVATE_THREAD').size
                        const pc = guild.channels.cache.filter(pc => pc.type === 'GUILD_STAGE_VOICE').size

                        const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, guild.iconURL())
                        .setThumbnail(message.guild.iconURL())
                        .setTitle(`Channel [${ch}]`)
                        .setDescription(`\`\`\`ini\nCategory:       [${ct}]\nText Channel:   [${tc}]\nVoice Channel:  [${vc}]\nNews Channel:   [${ac}]\nThread Channel: [${tr}]\nPublic Thread:  [${pth}]\nPrivate Thread: [${ptr}]\nStage Channel:  [${pc}]\n\`\`\``)
                        .setColor('#2f3136')

                        await msg.edit({ embeds: [embed] })
                    } else if (value === 'set'){
                        const rules = guild.rulesChannel
                        const mod = guild.systemChannel
                        const local = guild.preferredLocale
                        const verif = guild.verificationLevel
                        const nsfw = guild.nsfwLevel
                        const afkch = guild.afkChannel || 'Not set'
                        const afk = guild.afkTimeout
                        const lvl = guild.premiumTier
                        const mfa = guild.mfaLevel
                        const fil = guild.explicitContentFilter
                        const notif = guild.defaultMessageNotifications

                        const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, guild.iconURL())
                        .setThumbnail(message.guild.iconURL())
                        .setTitle('Settings')
                        .setDescription(`Rules: ${rules}\nSystem: ${mod}\nAFK: ${afkch}\n\`\`\`ini\nLocale:               [${local}]\nVerification Level:   [${verif}]\nNSFW Level:           [${nsfw}]\nAFK Timeout:          [${afk}s]\nBoost Level           [${lvl}]\n2FA Level:            [${mfa}]\nExplicit Filter:      [${fil}]\nMessage Notification: [${notif}]\n\`\`\``)
                        .setColor('#2f3136')

                        await msg.edit({ embeds: [embed] })
                    } else if (value === 'limit'){
                        const member = guild.maximumMembers
                        const boost = guild.premiumTier
                        let file
                        let emoji
                        let sticker
                        let bit
                        let thread
                        if(boost === 'NONE'){
                            file = 8
                            emoji = 50
                            sticker = 0
                            bit = 96
                            thread = 1
                        } else if (boost === 'TIER_1'){
                            file = 8
                            emoji = 100
                            sticker = 15
                            bit = 128
                            thread = 3
                        } else if (boost === 'TIER_2'){
                            file = 50
                            emoji = 150
                            sticker = 30
                            bit = 256
                            thread = 7
                        } else if (boost === 'TIER_3'){
                            file = 100
                            emoji = 250
                            sticker = 60
                            bit = 384
                            thread = 1
                        }

                        const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, guild.iconURL())
                        .setThumbnail(message.guild.iconURL())
                        .setTitle('Limits')
                        .setDescription(`\`\`\`ini\nFile Size:      [${file} mb]\nEmoji:          [${emoji}]\nSticker:        [${sticker}]\nBitrate:        [${bit} kbps]\nThread Archive: [${thread} day/s]\nMembers:        [${member}]\n\`\`\``)
                        .setColor('#2f3136')

                        await msg.edit({ embeds: [embed] })
                    } else if (value === 'role'){
                        const role = guild.roles.cache.size
                        const hoisted = guild.roles.cache.filter(r => r.hoist).size
                        const mention = guild.roles.cache.filter(r => r.mentionable).size
                        const manage = guild.roles.cache.filter(r => r.managed).size
                        const admin = guild.roles.cache.filter(r => r.permissions.has('ADMINISTRATOR')).size
                        const manager = guild.roles.cache.filter(r => r.permissions.has('MANAGE_GUILD')).size
                        const Admin = guild.roles.cache.filter(r => r.permissions.has('ADMINISTRATOR')).map(r => r).join(' ')

                        const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, guild.iconURL())
                        .setThumbnail(message.guild.iconURL())
                        .setTitle(`Roles [${role}]`)
                        .setDescription(`\`\`\`ini\nHoisted:      [${hoisted}]\nMentionable:  [${mention}]\nManaged:      [${manage}]\nAdmin Perms:  [${admin}]\nManage Perms: [${manager}]\n\`\`\``)
                        .addField('Roles with Admin Perms', `${Admin}`)
                        .setColor('#2f3136')

                        await msg.edit({ embeds: [embed] })
                    } else if (value === 'home'){
                        const embed = new MessageEmbed()
                        .setAuthor(message.guild.name, guild.iconURL())
                        .setThumbnail(message.guild.iconURL())
                        .addField("<:serverowner:879327553695916092> Owner", `<@${guild.ownerId}>`)
                        .addField("Channels", `${guild.channels.cache.filter((ch) => ch.type === 'GUILD_CATEGORY').size} Category\n<:channel:873923621037436968> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\n<:VC:873923621100335155> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}`, true)
                        .addField("Members", `<:members:879808046321246258> ${guild.members.cache.filter((member) => !member.user.bot).size} Users\n<:Bot:873923621247127612> ${guild.members.cache.filter((member) => member.user.bot).size} Bots\n<:notcheck:879227321154932746> ${(await message.guild.bans.fetch()).size} Banned\nTotal: ${guild.memberCount} Members`, true)
                        .addField("Stats", `<:atsign:879212267315544085> ${guild.roles.cache.size} Roles\n<:early_support:873923621318443118> ${guild.emojis.cache.size} Emojis\n<:Bug_hunter:876375936319258624> ${guild.stickers.cache.size} Stickers\n<:s_booster:873923620731228160> ${guild.premiumSubscriptionCount} Booster`, true)
                        .addField("Other", `<:modshield:879212267856617473> Verification: **${guild.verificationLevel}**\n<:channel_nsfw:873923620517322782> NSFW: **${guild.nsfwLevel}**\n<:link:879811047857487922> Vanity URL: **${guild.vanityURLCode || "None"}**`)
                        .setFooter(`ID: ${message.guild.id} \nCreated: ${moment(guild.createdTimestamp).format("LL")}`)
                        .setColor('#2f3136')

                        await msg.edit({ embeds: [embed] })
                    }
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}