const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nsfw",
    description: "...",

    async run (client, message, args){
        if(!message.member.permissions.has("MANAGE_CHANNELS")) return;
        const channel = message.mentions.channels.first() || message.channel;
        if(message.guild.me.permissions.has("MANAGE_CHANNELS")) return;

        if(!channel.nsfw){
            const ns = new MessageEmbed()
            .setTitle("<:dnd:880155848364658809> NSFW")
            .setDescription(`<:channel_nsfw:873923620517322782> Enable NSFW in ${channel}`)
            .setColor('RED')

            channel.edit({ nsfw: !channel.nsfw})

            try {
                await message.channel.send({ embeds: [ns] })
            } catch (error) {
                console.log(error)
            }

        } else {
            const fw = new MessageEmbed()
            .setTitle('<:online:880155848284995634> Success')
            .setDescription(`<:channel:873923621037436968> Disabled NSFW in ${channel}`)
            .setColor('GREEN')

            channel.edit({ nsfw: !channel.nsfw})

            try {
                await message.channel.send({ embeds: [fw] })
            } catch (error) {
                console.log(error)
            }
        }
    }
}