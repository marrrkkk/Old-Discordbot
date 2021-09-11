const { MessageEmbed } = require('discord.js');

const db = require('quick.db')

const moment = require('moment')

module.exports = {
    name: "afk",
    description: "...",

    async run (client, message, args){

        const reason = args.join(" ") || "AFK";

        if(reason.length > 1000) return message.reply("Your reason is too long!")

        await db.set(`afk-${message.author.id}+${message.guild.id}`, `${reason}`)

        const afkEmbed = new MessageEmbed()
        .setTitle('<:idle:880155848041701387> AFK')
        .setDescription(`I set your afk: \`${reason}\``)
        .setColor("YELLOW")

        message.channel.send({ content: `${message.author}`, embeds: [afkEmbed] }).catch(e => console.log(e))
    }
}