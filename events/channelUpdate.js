const client = require('../index')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

client.on('channelUpdate', async (oldChannel, newChannel) => {
    try {
        let channel = db.get(`setlogs_${oldChannel.guild.id}`)
        if(channel === null){
            return
        }
        if(oldChannel.type === 'GUILD_TEXT'){
            var type = '<:channel:873923621037436968> Text'
        }else if(oldChannel.type === 'GUILD_VOICE'){
            var type = '<:VC:873923621100335155> Voice'
        }else if(oldChannel.type === 'GUILD_CATEGORY'){
            var type = '<:channel:873923621037436968> Category'
        }else if(oldChannel.type === 'GUILD_NEWS'){
            var type = '<:blurpleannouncements:879212267588182086> News'
        }else if(oldChannel.type === 'GUILD_STAGE_VOICE'){
            var type = '<:stage:879811047920369725> Stage'
        }else if(oldChannel.type === 'GUILD_STORE'){
            var type = 'Store'
        }else if(!oldChannel.type){
            var type = 'Unknown'
        }

        if(oldChannel.name !== newChannel.name){
            const embed = new MessageEmbed()
            .setTitle(`<:channel:873923621037436968> Channel Updated`)
            .addField('Type', type)
            .addField(`Before`, oldChannel.name, true)
            .addField(`After`, newChannel.name, true)
            .setTimestamp()
            .setColor("ORANGE")
            .setFooter(`Channel ID: ${newChannel.id}`)
    
            await client.channels.cache.get(channel).send({ embeds: [embed] })
        }
    } catch (error) {
        console.log(error) 
    }
})