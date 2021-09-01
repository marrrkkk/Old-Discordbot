const { MessageEmbed } = require("discord.js")

const db = require('quick.db')

module.exports = {
    name: "set-prefix",
    description: "...",

    async run (client, message, args){
        const err = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("Please provide a new prefix")
        .setColor('RED')

        if(!message.member.permissions.has("ADMINISTRATOR")) return

        const newprefix = args[0]
        if(!newprefix) return message.channel.send({ embeds: [err] })

        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("Prefix is too long")
        .setColor('RED')

        if(newprefix.length > 5) return message.channel.send({ embeds: [errr] })

        const p = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Success')
        .setDescription(`Prefix set to **${newprefix}**`)
        .setColor("GREEN")

        message.channel.send({ embeds: [p] })
        db.set(`prefix_${message.guild.id}`, newprefix)
    }
}