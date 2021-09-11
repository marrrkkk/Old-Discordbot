const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'remove-role',
    aliases: ['rrole'],

    async run (client, message, args){
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing permission: `MANAGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return;

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!member) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        const role = message.mentions.roles.first()
        if(!role) return message.reply({content: "Please provide a role to remove", allowedMentions:{repliedUsers:false}})

        const rr = new MessageEmbed()
        .setTitle('<:dnd:880155848364658809> Successfully Removed')
        .setDescription(`Removed the role ${role} from ${member}`)
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