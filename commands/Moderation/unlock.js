const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unlock",
    description: "...",

    async run (client, message, args){
        if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("Missing Permission: `MANAGE_CHANNELS, MANAGE_ROLES`")
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "You don't have permission to manage channel", allowedMentions:{repliedUsers:false}})

        const channel = message.mentions.channels.first() || message.channel;

        try {
            await channel.permissionOverwrites.edit(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: true
            })
            const embed = new MessageEmbed()
            .setTitle("<:admin:879212267521073162> Channel Unlocked")
            .setDescription(`<:channel:873923621037436968> Unlocked ${channel}`)
            .setColor("GREEN")
            await channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            message.channe.send('<:cross:873923620517347389> Missing Permissions')
        }
    }
}