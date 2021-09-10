const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "remove-warn",
    aliases: ['rwarn'],

    async run (client, message, args){
        if(!message.member.permissions.has("MANAGE_ROLES")) return;

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if(warnings === null){
            const ww = new MessageEmbed()
            .setDescription('<:blob_outage:879811047979118682> ・ This user has no warning/s')
            .setColor('BLUE')
            try {
                await message.channel.send({ embeds: [ww]})
                
            } catch (error) {
                
            }
        }

        db.delete(`warnings_${message.guild.id}_${user.id}`)
        const cwarn = new MessageEmbed()
        .setTitle('\<:online:880155848284995634> Success')
        .setDescription(`Removed all warnings from ${user}`)
        .setColor("GREEN")

        try {
            await message.channel.send({ embeds: [cwarn] })
        } catch (error) {
            console.log(error)
        }
    }
}