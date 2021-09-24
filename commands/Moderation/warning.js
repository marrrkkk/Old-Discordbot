const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'warns',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has("MANAGE_ROLES")) return;
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if(!user) return message.reply({ content: "Please specify a member", allowedMentiions:{repliedUsers:false}})

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)

        if(warnings === null){
            const embed = new MessageEmbed()
            .setDescription('<:blob_outage:879811047979118682> ・ This user has no warning/s')
            .setColor('BLUE')
            try {
                await message.channel.send({ embeds: [embed]})
            } catch (error) {
                console.log(error)
            }
            
        } else {
            const sw = new MessageEmbed()
            .setTitle('<:blurplecertifiedmoderator:879212267470749746> Warnings')
            .setDescription(`<@${user.user.id}> have ${warnings} warning/s`)
            .setColor("BLURPLE")
            try {
                await message.channel.send({ embeds: [sw] })       
            } catch (error) {
                console.log(error)
            }

        }
    }
}