const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'afk',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const reason = args.join(" ") || "AFK"

        if(reason.length > 1500) return message.reply("Your reason is too long!")

        await db.set(`afk-${message.author.id}+${message.guild.id}`, `${reason}`)
        await db.set(`time-${message.author.id}+${message.guild.id}`, Date.now())

        const afkEmbed = new MessageEmbed()
        .setTitle('<:idle:880155848041701387> AFK')
        .setDescription(`I set your AFK: \`${reason}\``)
        .setColor("YELLOW")

        await message.channel.send({ content: `${message.author}`, embeds: [afkEmbed] }).catch(e => console.log(e))
    }
}