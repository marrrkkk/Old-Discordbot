const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'rwarn',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_ROLES")) return;

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply({ content: "Please specify a member", allowedMentions:{repliedUsers:false}})

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if(warnings === null){
            const embed = new MessageEmbed()
            .setDescription('<:blob_outage:879811047979118682> ・ This user has no warning/s')
            .setColor('BLUE')

            await message.channel.send({ embeds: [embed]}).catch(e => console.log(e))
        }

        await db.delete(`warnings_${message.guild.id}_${user.id}`)
        const embed = new MessageEmbed()
        .setTitle('\<:online:880155848284995634> Success')
        .setDescription(`Removed all warnings from ${user}`)
        .setColor("GREEN")

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}