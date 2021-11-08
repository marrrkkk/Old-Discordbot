const client = require('../index')
const logs = require('discord-logs')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
logs(client)

client.on('voiceChannelJoin', async (member, channel) => {
    try {
        const ch = db.get(`memlogs_${member.guild.id}`)
        if(ch === null) return

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('<:VC:873923621100335155> Joined VC')
        .setDescription(`${member} joined ${channel}`)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
        .setColor('BLUE')

        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('voiceChannelLeave', async (member, channel) => {
    try {
        const ch = db.get(`memlogs_${member.guild.id}`)
        if(ch === null) return

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('<:VC:873923621100335155> Left VC')
        .setDescription(`${member} left ${channel}`)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
        .setColor('LUMINOUS_VIVID_PINK')

        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('voiceChannelSwitch', async (member, oldChannel, newChannel) => {
    try {
        const ch = db.get(`memlogs_${member.guild.id}`)
        if(ch === null) return

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('<:VC:873923621100335155> Switch VC')
        .setDescription(`${member} moved from ${oldChannel} to ${newChannel}`)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
        .setColor('YELLOW')

        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('voiceStreamingStart', async (member, voiceChannel) => {
    try {
        const ch = db.get(`memlogs_${member.guild.id}`)
        if(ch === null) return

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('<:live:894461347352436736> Started Streaming')
        .setDescription(`${member} started streaming in ${voiceChannel}`)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
        .setColor('PURPLE')

        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('voiceStreamingStop', async (member, voiceChannel) => {
    try {
        const ch = db.get(`memlogs_${member.guild.id}`)
        if(ch === null) return

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('<:live:894461347352436736> Stopped Streaming')
        .setDescription(`${member} stopped streaming in ${voiceChannel}`)
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
        .setColor('RED')

        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})