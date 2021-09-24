const client = require('../index')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

client.on('channelCreate', async channel => {
    try {
        if(channel.type === 'GUILD_TEXT'){
            var type = 'Text'
        }else if(channel.type === 'GUILD_VOICE'){
            var type = 'Voice'
        }else if(channel.type === 'GUILD_CATEGORY'){
            var type = 'Category'
        }else if(channel.type === 'GUILD_NEWS'){
            var type = 'News'
        }else if(channel.type === 'GUILD_STAGE_VOICE'){
            var type = 'Stage'
        }else if(channel.type === 'GUILD_STORE'){
            var type = 'Store'
        }else if(!channel.type){
            var type = 'Unknown'
        }

        let ch = db.get(`setlogs_${channel.guild.id}`)
        if(ch === null){
            return;
        }
        const embed = new MessageEmbed()
        .setTitle(`<:channel:873923621037436968> Channel Created`)
        .addField('Type', type, true)
        .addField(`Channel Name`, channel.name, true)
        .addField(`Channel ID`, channel.id)
        .setTimestamp()
        .setColor("BLURPLE")
    
        await client.channels.cache.get(ch).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})