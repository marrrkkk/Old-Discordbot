const client = require('../index')

const dbb = require('quick.db')

client.on('messageCreate', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(dbb.has(`afk-${message.author.id}+${message.guild.id}`)){
        const info = dbb.get(`afk-${message.author.id}+${message.guild.id}`)
        await dbb.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`I removed your afk (${info})`)
    }
    if(message.mentions.members.first()){
        if(dbb.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)){
            message.channel.send(message.mentions.members.first().displayName + " is AFK - " + dbb.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        } else return;
    }
})