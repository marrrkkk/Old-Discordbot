const {Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'nsfw',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.reply("Missing Permission: `MANAGE_CHANNELS`");
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply({ content: "You don't have permission to manage channel", allowedMentions:{repliedUsers:false}});
        const channel = message.mentions.channels.first() || message.channel;

        if(!channel.nsfw){
            const embed = new MessageEmbed()
            .setTitle("<:dnd:880155848364658809> NSFW")
            .setDescription(`<:channel_nsfw:873923620517322782> Enable NSFW in ${channel}`)
            .setColor('RED')

            await channel.edit({ nsfw: !channel.nsfw})
            await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))

        } else {
            const embed = new MessageEmbed()
            .setTitle('<:online:880155848284995634> Success')
            .setDescription(`<:channel:873923621037436968> Disable NSFW in ${channel}`)
            .setColor('GREEN')

            await channel.edit({ nsfw: !channel.nsfw})
            await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
        }
    }
}