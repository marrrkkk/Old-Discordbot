const client = require('../index')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

client.on('roleDelete', async role => {
    try {
        let channel = db.get(`setlogs_${role.guild.id}`)
        if(channel === null){
            return
        }
        const embed = new MessageEmbed()
        .setTitle(`<:atsign:879212267315544085> Role Deleted`)
        .setDescription(`**Name: **${role.name}\n**Color: **${role.hexColor}\n**Hoisted: **${role.hoist}\n**Mentionable: **${role.mentionable}`)
        .setTimestamp()
        .setColor("DARKER_GREY")
        .setFooter(`Role ID: ${role.id}`)
    
        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})