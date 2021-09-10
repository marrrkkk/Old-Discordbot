const client = require('../index')

const { MessageEmbed } = require('discord.js')

const dbb = require('quick.db')

client.on('messageDelete', async message => {
    try {
        if(message.author.bot) return;
        let mes = dbb.get(`setmeslogs_${message.guild.id}`)
        if(mes === null){
            return;
        }
        const mess = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`<:delete:879049914695430194> Message Deleted`)
        .addField(`Author`, `${message.author}`)
        .addField(`Channel`, `${message.channel}`)
        .setDescription(`**Message: ** ${message.content}`)
        .setImage(message.attachments.first()?.proxyURL || null)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`User ID: ${message.author.id}`)
        .setTimestamp()
        .setColor("RED")
    
        await client.channels.cache.get(mes).send({ embeds: [mess] })
        
    } catch (error) {
        
    }
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        if(oldMessage.author.bot) return;
        let umes = dbb.get(`setmeslogs_${oldMessage.guild.id}`)
        if(umes === null){
            return;
        }
        const umess = new MessageEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
        .setTitle(`<:edit:879055636057432114> Message Edited`)
        .setDescription(`**Before: **${oldMessage.content}\n**After: **${newMessage.content}`)
        .addField(`Author:`, `${oldMessage.author}`)
        .addField(`Channel`, `${oldMessage.channel}`)
        .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`User ID: ${oldMessage.author.id}`)
        .setTimestamp()
        .setColor("YELLOW")
    
        await client.channels.cache.get(umes).send({ embeds: [umess] })
        
    } catch (error) {
        
    }
})