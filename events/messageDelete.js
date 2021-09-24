const client = require('../index')
const db = require('quick.db')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

//message logging
client.on('messageDelete', async message => {
    try {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('link')
            .setEmoji('<:context:886094352961650748>')
            .setLabel('Context')
            .setStyle('SECONDARY')
        )
        if(message.author.bot) return;
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
    
        let msg = await client.channels.cache.get(channel).send({ embeds: [embed], components: [row] })
        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'});

        collector.on('collect', async b => {
            await b.reply({ content: `${message.url}`, ephemeral: true})
        })
    } catch (error) {
        console.log(error)
    }
})

//anti-ghostping
client.on('messageDelete', async message => {
    try {
        if(db.has(`anti-ghostping-${message.guild.id}`)=== false) return;
        if(message.author.bot) return;
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
    if(message.author.bot) return
    let snipes = client.snipes.get(message.channel.id) || [];
    if(snipes.length > 9) snipes = snipes.slice(0, 8)

    snipes.unshift({
        msg: message,
        image: message.attachments.first()?.proxyURL || null,
        time: Date.now(),
    });

    client.snipes.set(message.channel.id, snipes);
})