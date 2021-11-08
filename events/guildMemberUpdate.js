const client = require('../index')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const logs = require('discord-logs')
logs(client)

client.on('guildMemberRoleAdd', async (member, role) => {
    try {
        const channel = db.get(`memlogs_${member.guild.id}`)
        if(channel === null) return
    
        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField('Added role', `${role}`)
        .setColor('GREEN')
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
    
        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('guildMemberRoleRemove', async (member, role) => {
    try {
        const channel = db.get(`memlogs_${member.guild.id}`)
        if(channel === null) return
    
        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .addField('Removed role', `${role}`)
        .setColor('GREY')
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()
    
        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('guildMemberNicknameUpdate', async (member, oldNickname, newNickname) => {
    try {
        const channel = db.get(`memlogs_${member.guild.id}`)
        if(channel === null) return

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle('Nickname Update')
        .addField('Before', oldNickname || member.user.username)
        .addField('After', newNickname || member.user.username)
        .setColor('YELLOW')
        .setFooter(`ID: ${member.user.id}`)
        .setTimestamp()

        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})