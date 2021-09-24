const client = require('../index')
const { channel } = require('../config.json')
const { MessageEmbed } = require('discord.js')

client.on('guildDelete', async guild => {
    try {
        const embed = new MessageEmbed()
        .setTitle('Leave the Server')
        .addField('Guild Name', `${guild.name}`)
        .addField('Members', `${guild.memberCount}`)
        .addField('Owner', `<@${guild.ownerId}>\n(${guild.ownerId})`)
        .addField('Total Servers', `${client.guilds.cache.size} Servers`)
        .setThumbnail(guild.iconURL())
        .setFooter(`Guild ID: ${guild.id}`)
        .setColor('RED')

        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})