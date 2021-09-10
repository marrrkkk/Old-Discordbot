const { MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: 'suggest',

    async run (client, message, args){
        let ch = db.get(`suggestion_${message.guild.id}`)
        if(ch === null) return;

        const er = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription('Usage: `,suggest <content>`')
        .setColor('RED')

        const err = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription('You description exceeded `2000` max characters')
        .setColor('RED')

        const suggest = args.join(" ")

        if(!suggest) return message.channel.send({ embeds: [er] })
        if(!suggest.length > 2000) return message.channel.send({ embeds: [err] })

        try {
            message.react('✅')

            let s = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(suggest)
            .setTimestamp()
            .setColor('BLURPLE')
    
            let msg = await client.channels.cache.get(ch).send({ embeds: [s] })
            await msg.react('<:check:873923620282437654>')
            await msg.react('<a:typing:873923620840296469>')
            await msg.react('<:cross:873923620517347389>')
            
        } catch (error) {
            console.log(error)
        }
    }
}