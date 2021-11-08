const client = require('../index')
const db = require('quick.db')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

//message logging
client.on('messageDelete', async message => {
    try {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Context')
            .setStyle('LINK')
            .setURL(message.url)
        )
        if(message.author.bot) return
        if(message.channel.type === 'DM') return
        let channel = db.get(`setmeslogs_${message.guild.id}`)
        if(channel === null){
            return;
        }
        const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTitle(`<:delete:879049914695430194> Message Deleted`)
        .addField(`Author`, `${message.author}`)
        .addField(`Channel`, `${message.channel}`)
        .setDescription(`**Message: ** ${message.content || '[no text]'}`)
        .setImage(message.attachments.first()?.proxyURL || null)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setFooter(`User ID: ${message.author.id}`)
        .setTimestamp()
        .setColor("RED")
    
        await client.channels.cache.get(channel).send({ embeds: [embed], components: [row] })
    } catch (error) {
        console.log(error)
    }
})

//anti-ghostping
client.on('messageDelete', async message => {
    try {
        if(message.author.bot) return
        if(message.channel.type === 'DM') return
        if(db.has(`anti-ghostping-${message.guild.id}`)=== false) return;
        if(message.mentions.users.first() || message.mentions.roles.first() || message.content.toLowerCase().includes("@everyone", "@here")){
            const embed = new MessageEmbed()
            .setTitle(`Ghost Ping Detected!`)
            .addField(`<:6977ping:879212267151978497>  Pinged by: `, `${message.author}`)
            .addField(`<:atsign:879212267315544085>   Message: `, `${message.content}`)
            .setColor("RED")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
    
            return await message.channel.send({ embeds: [embed] })
        }
    } catch (error) {
        console.log(error)
    }
})

//snipe
client.on('messageDelete', async message => {
    try {
        if(message.author.bot) return
        if(message.channel.type === 'DM') return
        let snipes = client.snipes.get(message.channel.id) || [];
        if(snipes.length > 9) snipes = snipes.slice(0, 8)
    
        snipes.unshift({
            msg: message,
            image: message.attachments.first()?.proxyURL || null,
            time: Date.now(),
        });
    
        await client.snipes.set(message.channel.id, snipes);
    } catch (error) {
        console.log(error)
    }
})