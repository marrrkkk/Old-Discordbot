const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "set-confession",
    description: "...",

    async run (client, message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        let channel = message.mentions.channels.first() || message.channel || args[0]

        db.set(`setcfs_${message.guild.id}`, channel.id)

        if(args[0] === "disable"){
            const d = new MessageEmbed()
            .setTitle('<:dnd:880155848364658809> Disabled')
            .setDescription('Successfully disable Confession')
            .setColor('RED')
            await db.delete(`setcfs_${message.guild.id}`)
            return message.channel.send({ embeds: [d] }).catch(e => console.log(e))
        }

        const cfembed = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Successful')
        .setDescription(`<:mail:879049788514005013>  Confession has been set to ${channel}`)
        .setColor('LUMINOUS_VIVID_PINK')
        try {
            await message.channel.send({ embeds: [cfembed] })
        } catch (error) {
            console.log(error)
        }
    }
}