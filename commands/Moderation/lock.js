const { Client, Message, MessageEmbed, Permissions } = require('discord.js')

module.exports = {
    name: 'lock',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has('MANAGE_CHANNELS')) return message.reply("Missing Permission: `MANAGE_CHANNELS, MANAGE_ROLES`")
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "You don't have permission to manage channel", allowedMentions:{repliedUsers:false}})

        const channel = message.mentions.channels.first() || message.channel
        const role = message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone")
        const perm = role.permissionsIn(channel)

        if(!perm.has([
            Permissions.FLAGS.SEND_MESSAGES
        ])) return message.reply("Channel is already lockdown")

        try {
            await channel.permissionOverwrites.edit(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() === "@everyone"), {
                SEND_MESSAGES: false
            })
            const embed = new MessageEmbed()
            .setTitle("<:admin:879212267521073162> Channel Locked")
            .setDescription(`<:channel_lock:873923620576063568> Locked ${channel}`)
            .setColor("RED")
            await channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            await message.channel.send('<:cross:873923620517347389> Missing Permissions').catch(e => console.log(e))
        }
    }
}