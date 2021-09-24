const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'warn',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("You don't have permission to use this command")
        .setFooter("Require MANAGE ROLES permission")
        .setColor("RED")
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({ embeds: [errr] });
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        let reason = args.slice(1).join(" ")

        if(!reason) reason = "No reason given";

        if(!user) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if(warnings === null){
            await db.set(`warnings_${message.guild.id}_${user.id}`, 1)
            const embed = new MessageEmbed()
            .setDescription(`<:6417_ModMute:879212267097456692> ・ Warned ${user}`)
            .setColor('RED')
            try {
                await message.channel.send({ embeds: [embed] })
            } catch (error) {
                console.log(error)
            }         
        }else if(warnings !== null){
            await db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            const embed = new MessageEmbed()
            .setDescription(`<:6417_ModMute:879212267097456692> ・ Warned ${user}`)
            .setColor('RED')
            try {
                await message.channel.send({ embeds: [embed] })      
            } catch (error) {
                console.log(error)
            }       
        }
        let warnlog = db.get(`setmodlogs_${message.guild.id}`)
        if(warnlog === null){
            null
        }

        const embed = new MessageEmbed()
        .setTitle(`<:6417_ModMute:879212267097456692> Member Warned`)
        .addField(`Member`, `${user}`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${user.id}`)
        .setColor("FUCHSIA")

        try {
            await client.channels.cache.get(warnlog).send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}