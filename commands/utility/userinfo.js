const { MessageEmbed } = require("discord.js");

const moment = require('moment')

module.exports = {
    name: "userinfo",
    aliases: ['whois'],

    async run (client, message, args){
        const { guild, channel } = message

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
        const member = guild.members.cache.get(user.id)
        let role = member.roles.cache.filter((roles) => roles.id !== message.guild.id).map((role) => role.toString())
        if(role.length === 0) role = "No roles to display"
        if(role.length > 20) role = "Too many roles to display"

        const userEmbed = new MessageEmbed()
        .setTitle("<:members:879808046321246258> User Information")
        .addField('Username', `${member.user.username}`)
        .addField('Tag', `#${member.user.discriminator}`)
        .addField(`Created: `, `${moment(member.user.createdAt).format("DD-MM-YYYY [at] HH:mm")}`)
        .addField(`Joined Server: `, `${moment(member.user.joinedAt).format("DD-MM-YYYY [at] HH:mm")}`)
        .addField('User ID', `${member.user.id}`)
        .addField(`Roles`, `${role}`)
        .addField(`Status`, `${member.user.presence.status}`)
        .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        .setColor('RANDOM')
        .setFooter(`Requested by: ${message.author.username}`)

        try {
            await message.channel.send({ embeds: [userEmbed] });
            
        } catch (error) {
            
        }
    }
}