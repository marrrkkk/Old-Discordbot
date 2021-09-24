const client = require('../index')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

client.on('threadCreate', async thread => {
    try {
        let channel = db.get(`setlogs_${thread.guild.id}`)
        if(channel === null){
            return
        }
    
        const embed = new MessageEmbed()
        .setTitle(`🧵 Thread Created`)
        .addField(`Thread Name`, thread.name)
        .addField(`Thread ID`, thread.id)
        .setTimestamp()
        .setColor("BLURPLE")
    
        await client.channels.cache.get(channel).send({ embeds: [embed] }) 
    } catch (error) {
        console.log(error)
    }
})