const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'setprefix',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return

        //fail embed
        const err = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("Please provide a new prefix")
        .setColor('RED')

        const newprefix = args[0]
        if(!newprefix) return message.channel.send({ embeds: [err] })

        //fail embed2
        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("Prefix is too long")
        .setColor('RED')

        if(newprefix.length > 5) return message.channel.send({ embeds: [errr] })

        //success embed
        const success = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Success')
        .setDescription(`Prefix set to **${newprefix}**`)
        .setColor("GREEN")

        message.channel.send({ embeds: [success] }).catch(e => console.log(e))
        await db.set(`prefix_${message.guild.id}`, newprefix)
    }
}