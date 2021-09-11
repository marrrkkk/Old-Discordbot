const { MessageEmbed } = require('discord.js');
const client = require('../index')
const ch = '882474976136007740'

client.on('guildCreate', async guild => {
    try {
        const embed = new MessageEmbed()
        .setTitle('Server Joined')
        .addField('Guild Name', `${guild.name}`)
        .addField('Members', `${guild.memberCount}`)
        .addField('Owner', `<@${guild.ownerId}>\n(${guild.ownerId})`)
        .addField('Total Servers', `${client.guilds.cache.size} Servers`)
        .setThumbnail(guild.iconURL())
        .setColor('GREEN')

        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})

client.on('guildDelete', async guild => {
    try {
        const embed1 = new MessageEmbed()
        .setTitle('Leave the Server')
        .addField('Guild Name', `${guild.name}`)
        .addField('Members', `${guild.memberCount}`)
        .addField('Owner', `<@${guild.ownerId}>\n(${guild.ownerId})`)
        .addField('Total Servers', `${client.guilds.cache.size} Servers`)
        .setThumbnail(guild.iconURL())
        .setColor('RED')

        await client.channels.cache.get(ch).send({ embeds: [embed1] })
    } catch (error) {
        console.log(error)
    }
})