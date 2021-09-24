const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'removerole',
    aliases: ['rrole'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing permission: `MANAGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(" "))
        if(!role) return message.reply({content: "Please provide a role to remove", allowedMentions:{repliedUsers:false}})

        if(!member.roles.cache.get(role.id)) return message.channel.send(`<:cross:873923620517347389> ${member.displayName} doesn't have that role`)

        const rr = new MessageEmbed()
        .setTitle('<:dnd:880155848364658809> Successfully Removed')
        .setDescription(`Removed ${role} from ${member}`)
        .setColor("LUMINOUS_VIVID_PINK")

        const er = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription('Unable to remove role')
        .setColor('RED')

        try {
            await member.roles.remove(role)
            await message.channel.send({ embeds: [rr] })
            
        } catch (error) {
            await message.channel.send({ embeds: [er] })  
        }
    }
}