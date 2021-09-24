const {Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'confession',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        await db.set(`setcfs_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const embed = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disable Confession')
            .setColor('RED')
            await db.delete(`setcfs_${message.guild.id}`)
            return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
        }

        const embed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:mail:879049788514005013>  Confession has been set to ${channel}`)
        .setColor('LUMINOUS_VIVID_PINK')

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}
