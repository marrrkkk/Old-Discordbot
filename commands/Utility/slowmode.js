const { Client, Message, MessageEmbed } = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'slowmode',
    aliases: ['slow', 'ratelimit'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let time = args[0]
        if(!time) return message.channel.send('Please provide a duration')
        if(!time.endsWith("s") && !time.endsWith("m") && !time.endsWith("h") && !time.endsWith("d")){
            return message.channel.send('Please provide a valid duration')
        }

        const embed = new MessageEmbed()
        .setDescription(`Set slowmode to **${time}**`)

        await message.channel.setRateLimitPerUser(ms(time) / 1000)
        await message.channel.send({ embeds: [embed] })
    }
}