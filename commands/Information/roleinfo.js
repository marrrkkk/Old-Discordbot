const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
    name: "roleinfo",
    description: "...",

    async run (client, message, args){
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        if(!role) return message.reply({ content: "Please specify a role", allowedMentions:{repliedUsers:false}})

        const rEmbed = new MessageEmbed()
        .setTitle(`<:atsign:879212267315544085> Role Information`)
        .addField("Name", `${role.name}`)
        .addField("Color", `${role.hexColor}`)
        .addField("Mentionable", `${role.mentionable}`)
        .addField("Created", `${moment(role.createdAt).format("LL")}`)
        .addField("Members", `${role.members.size}`)
        .setColor(role.color)

        message.channel.send({ embeds: [rEmbed] }).catch(e => console.log(e))
    }
}