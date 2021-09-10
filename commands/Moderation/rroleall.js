const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'rroleall',

    async run (client, message, args){
        const err = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription('Missing Permission: `MANAGE_ROLES`')
        .setColor('RED')

        const er = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription('Missing Permission: `ADMINISTRATOR`')
        .setColor('RED')

        if(!message.guild.me.permissions.has('MANAGE_ROLES')) return message.channel.send({ embeds: [err] })
        if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send({ embeds: [err] })
        const role = message.mentions.roles.first()

        if(!role) return message.reply({ content: 'Please provide a role', allowedMentions:{repliedUsers:false}})


        try {
            await message.guild.members.cache.forEach(member => member.roles.remove(role.id))
            await message.react('✅')          
        } catch (error) {
            console.log(error)
            
        }
    }
}