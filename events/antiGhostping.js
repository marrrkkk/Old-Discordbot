const client = require('../index')

const { MessageEmbed } = require('discord.js')

const dbb = require('quick.db')

client.on('messageDelete', async message => {
    if(dbb.has(`anti-ghostping-${message.guild.id}`)=== false) return;
    if(message.author.bot) return;
    if(message.mentions.users.first() || message.mentions.roles.first() || message.content.toLowerCase().includes("@everyone", "@here")){
        const embed = new MessageEmbed()
        .setTitle(`Ghost Ping Detected!`)
        .addField(`<:6977ping:879212267151978497>  Pinged by: `, `${message.author}`)
        .addField(`<:atsign:879212267315544085>   Message: `, `${message.content}`)
        .setColor("RED")
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        return message.channel.send({ embeds: [embed] })
    }
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
    if(dbb.has(`anti-ghostping-${oldMessage.guild.id}`)=== false) return;
    if(oldMessage.author.bot) return;
    if(oldMessage.mentions.users.first() || oldMessage.mentions.roles.first() || oldMessage.content.toLowerCase().includes("@everyone", "@here")){
        const embed = new MessageEmbed()
        .setTitle("Ghost Ping Detected!")
        .addField(`Edited by: `, `${oldMessage.author}`)
        .addField(`Before: `, `${oldMessage.content}`)
        .addField(`After: `, `${newMessage.content}`)
        .setColor(`BLURPLE`)
        .setThumbnail(oldMessage.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        oldMessage.channel.send({ embeds: [embed] })
    }
})