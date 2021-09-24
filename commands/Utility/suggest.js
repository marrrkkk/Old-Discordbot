const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'suggest',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let prefix = db.fetch(`prefix_${message.guild.id}`)
        if(prefix === null) prefix = ','

        let channel = db.get(`suggestion_${message.guild.id}`)
        if(channel === null) return message.channel.send(`**Suggestion** is disabled, enable it by typing \`${prefix}suggestion\` in your desired channel`)

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
            await message.react('✅')

            let embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription(suggest)
            .setTimestamp()
            .setColor('BLURPLE')
    
            let msg = await client.channels.cache.get(channel).send({ embeds: [embed] })
            await msg.react('<:check:873923620282437654>')
            await msg.react('<a:typing:873923620840296469>')
            await msg.react('<:cross:873923620517347389>')
            
        } catch (error) {
            console.log(error)
        }
    }
}