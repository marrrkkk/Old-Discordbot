const { MessageEmbed, ReactionUserManager, Permissions } = require('discord.js')

const db = require('quick.db')

module.exports = {
    name: 'help',

    async run (client, message, args){
        const channel = message.channel;

        const botPermissionsIn = message.guild.me.permissionsIn(channel);
    
        if(!botPermissionsIn.has([
            Permissions.FLAGS.ADD_REACTIONS,
            Permissions.FLAGS.EMBED_LINKS
        ])) return message.channel.send('<:cross:873923620517347389> Missing Permission: `ADD_REACTIONS/EMBED_LINKS`').catch(e => console.log(e))
        let prefix = db.fetch(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = ","

        try {
            const help = new MessageEmbed()
            .setTitle("Help Menu")
            .setDescription(`Prefix: \`${prefix}\``)
            .addField('Categories:', `
            <:developer:873923621482033212> **Settings**\n<:reply:885439572996149288> Configure log channels and bot prefix
            \n<:blurplecertifiedmoderator:879212267470749746> **Moderation**\n<:reply:885439572996149288> Moderate members and manage roles 
            \n<:rules:880108679184130090> **Utility**\n<:reply:885439572996149288> Utilities and other commands
            \n<:blurpleannouncements:879212267588182086> **Fun**\n<:reply:885439572996149288> For entertainment and images
            \n<:info:879212267521056818> **Infomation**\n<:reply:885439572996149288>Information commands about the guild
            `)
            .setColor("BLURPLE")
    
            const filter = (reaction, user) => [
                '<:developer:873923621482033212>', 
                '<:blurplecertifiedmoderator:879212267470749746>', 
                '<:rules:880108679184130090>', 
                '<:blurpleannouncements:879212267588182086>',
                '<:cross:873923620517347389>',
                '<:info:879212267521056818>'
            ].includes(reaction.emoji.name) && (message.author.id === user.id)
            let msg = await message.channel.send({ embeds: [help ]})
            await msg.react('<:developer:873923621482033212>')
            await msg.react('<:blurplecertifiedmoderator:879212267470749746>')
            await msg.react('<:rules:880108679184130090>')
            await msg.react('<:blurpleannouncements:879212267588182086>')
            await msg.react('<:info:879212267521056818>')
    
            let ReactionCol = msg.createReactionCollector(filter)
    
            ReactionCol.on('collect', async (reaction, user) => {
                if(reaction.emoji.name === 'developer'){
                    reaction.users.remove(message.author.id)
                    const s = new MessageEmbed()
                    .setTitle('<:developer:873923621482033212> Settings')
                    .addField('anti-ghostping on/off', '<:reply:885439572996149288>Toggle anti-ghostping feature')
                    .addField('set-meslog', '<:reply:885439572996149288>Set the message log channel')
                    .addField('set-log', '<:reply:885439572996149288>Set the server log channel')
                    .addField('set-confession', '<:reply:885439572996149288>Set the confession channel')
                    .addField('set-prefix', '<:reply:885439572996149288>Set the bot prefix')
                    .addField('set-suggestion', '<:reply:885439572996149288>Set the suggestion channel')
                    .setColor('BLURPLE')
    
                    return await msg.edit({ embeds: [s] })
                }
                
                if(reaction.emoji.name === 'blurplecertifiedmoderator'){
                    reaction.users.remove(message.author.id)
                    const m = new MessageEmbed()
                    .setTitle('<:blurplecertifiedmoderator:879212267470749746> Moderation')
                    .addField('ban/unban', '<:reply:885439572996149288>Ban or Unban a member from a guild')
                    .addField('kick', 'Kick a member from the guild')
                    .addField('mute/unmute', '<:reply:885439572996149288>Mute or Unmute a member')
                    .addField('tempmute', '<:reply:885439572996149288>Temporarily mute a member')
                    .addField('warn/rwarn', '<:reply:885439572996149288>Give warning to user or Remove user warnings')
                    .addField('warning', '<:reply:885439572996149288>Shows user current warnings')
                    .addField('arole/rrole', '<:reply:885439572996149288>Add or Remove role to a member')
                    .addField('lock/unlock', '<:reply:885439572996149288>Lock or Unlock a channel from the guild')
                    .setColor('BLURPLE')
    
                    return await msg.edit({ embeds: [m] })
                }
    
                if(reaction.emoji.name === 'rules'){
                    reaction.users.remove(message.author.id)
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
    
                    return await msg.edit({ embeds: [u] })
                }
                if(reaction.emoji.name === 'blurpleannouncements'){
                    reaction.users.remove(message.author.id)
                    const f = new MessageEmbed()
                    .setTitle('<:blurpleannouncements:879212267588182086>Entertainment')
                    .addField('anime', '<:reply:885439572996149288>Search about anime information')
                    .addField('ask', '<:reply:885439572996149288>Ask the bot a random question')
                    .addField('dog', '<:reply:885439572996149288>Send a random picture of a dog')
                    .addField('echo', '<:reply:885439572996149288>Send a message in specific channel')
                    .addField('level', '<:reply:885439572996149288>Show your current level')
                    .addField('meme', '<:reply:885439572996149288>Send a random meme from reddit')
                    .addField('movie', '<:reply:885439572996149288>Search about movie information')
                    .addField('snipe', '<:reply:885439572996149288>Snipe upto 5 recently deleted messages(including image)')
                    .addField('waifu', '<:reply:885439572996149288>Send a random waifu picture')
                    .addField('/confess', '<:reply:885439572996149288>Send an anonymous confession using slash command')
                    .addField('List of action commands: ', '`bite`,`blush`,`cuddle`,`kiss`,`pat`,`slap`')
                    .setFooter('For NSFW, do help-nsfw')
                    .setColor('BLURPLE')
    
                    return await msg.edit({ embeds: [f] })
                }
    
                if(reaction.emoji.name === 'info'){
                    reaction.users.remove(message.author.id)
                    const i = new MessageEmbed()
                    .setTitle('<:info:879212267521056818>Information Command')
                    .addField('botinfo', '<:reply:885439572996149288>Information about the bot')
                    .addField('roleinfo', '<:reply:885439572996149288>Get the information about the role')
                    .addField('serverinfo', '<:reply:885439572996149288>Get the information about the server')
                    .addField('userinfo', '<:reply:885439572996149288>Get the information about the user')
                    .setColor('BLURPLE')
    
                    return await msg.edit({ embeds: [i] })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}