const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'add-role',
    aliases: ['arole'],

    async run (client, message, args){
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing permission: `MANAGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        const role = message.mentions.roles.first()
        if(!role) return message.reply({content: "Please provide a role to add", allowedMentions:{repliedUsers:false}})

        const ar = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successfully Added')
        .setDescription(`Added the role ${role} to ${member}`)
        .setColor("GREEN")

        const er = new MessageEmbed()
        .setTitle(' Error')
        .setDescription('Unable to add role')
        .setColor('RED')

        try {
            await member.roles.add(role)
            await message.channel.send({ embeds: [ar] })
        } catch (error) {
            await message.channel.send('<:cross:873923620517347389> Unable to add role').catch(e => console.log(e))
        }
    }
}