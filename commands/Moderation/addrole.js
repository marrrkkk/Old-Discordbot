const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'addrole',
    aliases: ['arole'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing permission: `MANAGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(" "))
        if(!role) return message.reply({content: "Please provide a role to remove", allowedMentions:{repliedUsers:false}})

        if(member.roles.cache.get(role.id)) return message.channel.send(`<:cross:873923620517347389> ${member.displayName} already have that role`)

        const ar = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successfully Added')
        .setDescription(`Added ${role} to ${member}`)
        .setColor("GREEN")

        try {
            await member.roles.add(role)
            await message.channel.send({ embeds: [ar] })
        } catch (error) {
            await message.channel.send('<:cross:873923620517347389> Unable to add role').catch(e => console.log(e))
        }
    }
}