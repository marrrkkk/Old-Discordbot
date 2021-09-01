const db = require('quick.db');

const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "warning",
    aliases: ['warns'],

    async run (client, message, args){
        if(!message.member.permissions.has("MANAGE_ROLES")) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!user) return message.reply({ content: "Please specify a member", allowedMentiions:{repliedUsers:false}})

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if(warnings === null){
            const ww = new MessageEmbed()
            .setDescription('<:blob_outage:879811047979118682> ・ This user has no warning/s')
            .setColor('BLUE')
            await message.channel.send({ embeds: [ww]})
            
        } else {
            const sw = new MessageEmbed()
            .setTitle('<:blurplecertifiedmoderator:879212267470749746> Warnings')
            .setDescription(`<@${user.user.id}> have ${warnings} warning/s`)
            .setColor("BLURPLE")
            await message.channel.send({ embeds: [sw] })

        }
    }
}