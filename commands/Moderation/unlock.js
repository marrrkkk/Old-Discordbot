const { Client, Message, MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: 'unlock',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("Missing Permission: `MANAGE_CHANNELS, MANAGE_ROLES`")
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "You don't have permission to manage channel", allowedMentions:{repliedUsers:false}})

        const channel = message.mentions.channels.first() || message.channel;
        const role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone")
        const perm = role.permissionsIn(channel)

        if(perm.has([
            Permissions.FLAGS.SEND_MESSAGES
        ])) return message.reply("Channel is not in lockdown")

        try {
            await channel.permissionOverwrites.edit(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: null
            })
            const embed = new MessageEmbed()
            .setTitle("<:admin:879212267521073162> Channel Unlocked")
            .setDescription(`<:channel:873923621037436968> Unlocked ${channel}`)
            .setColor("GREEN")
            await channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            await message.channe.send('<:cross:873923620517347389> Missing Permissions')
        }
    }
}