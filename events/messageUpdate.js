const client = require('../index')
const db = require('quick.db')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        if(oldMessage.content === newMessage.content) return
        if(oldMessage.author.bot) return
        if(oldMessage.channel.type === 'DM') return
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Context')
            .setStyle('LINK')
            .setURL(newMessage.url)
        )
        let channel = db.get(`setmeslogs_${oldMessage.guild.id}`)
        if(channel === null){
            return;
        }
        const embed = new MessageEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
        .setTitle(`<:edit:879055636057432114> Message Edited`)
        .setDescription(`**Before: **${oldMessage.content || '[no text]'}\n**After: **${newMessage.content || '[no text]'}`)
        .addField(`Author:`, `${oldMessage.author}`)
        .addField(`Channel`, `${oldMessage.channel}`)
        .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`User ID: ${oldMessage.author.id}`)
        .setTimestamp()
        .setColor("YELLOW")
    
        await client.channels.cache.get(channel).send({ embeds: [embed], components: [row] }) 
    } catch (error) {
        console.log(error)
    }
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        if(oldMessage.content === newMessage.content) return
        if(oldMessage.author.bot) return
        if(oldMessage.channel.type === 'DM') return
        if(db.has(`anti-ghostping-${oldMessage.guild.id}`)=== false) return;
        if(oldMessage.mentions.users.first() || oldMessage.mentions.roles.first() || oldMessage.content.toLowerCase().includes("@everyone", "@here")){
            const embed = new MessageEmbed()
            .setTitle("Ghost Ping Detected!")
            .addField(`Edited by: `, `${oldMessage.author}`)
            .addField(`Before: `, `${oldMessage.content}`)
            .addField(`After: `, `${newMessage.content}`)
            .setColor(`BLURPLE`)
            .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
    
            return await oldMessage.channel.send({ embeds: [embed] })
        }
    } catch (error) {
        console.log(error)
    }
})