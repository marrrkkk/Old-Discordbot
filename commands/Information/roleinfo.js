const {Client, Message, MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'roleinfo',
    aliases: ['role'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' '))
        if(!role) return message.reply({ content: "<:cross:873923620517347389> Please specify a role", allowedMentions:{repliedUsers:false}})

        const rEmbed = new MessageEmbed()
        .setTitle(`<:atsign:879212267315544085> Role Information`)
        .addField("Name", `${role.name}`, true)
        .addField("Color", `${role.hexColor}`, true)
        .addField("Mentionable", `${role.mentionable}`, true)
        .addField("Members", `${role.members.size}`, true)
        .addField("Managed", `${role.managed}`, true)
        .addField("Created", `${moment(role.createdAt).format("LL")}`, true)
        .setFooter(`Role ID: ${role.id}`)
        .setColor(role.color)

        await message.channel.send({ embeds: [rEmbed] }).catch(e => console.log(e))
    }
}