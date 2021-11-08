const { Client, Message, MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'channelinfo',
    aliases: ['channel'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

        if(!channel.isThread()){
            const embed  = new MessageEmbed()
            .setTitle(`${channel.name}`)
            .setDescription(`${channel}`)
            .addField('Topic', `${channel.topic || 'No topic for this channel'}`)
            .addField('General Information', `**Created:** ${moment(channel.createdAt).format("LL")}\n**Parent:** ${channel.parent}\n**RateLimit:** ${channel.rateLimitPerUser}s\n**NSFW:** ${channel.nsfw}\n**Type:** \`${channel.type}\``, true)
            .setFooter(`ID: ${channel.id}`)
            .setColor('#2f3136')

            return await message.channel.send({ embeds: [embed] })
        } else if (channel.isThread()){
            let time
            if(channel.autoArchiveDuration === 60){
                time = '1 Hour'
            } else if (channel.autoArchiveDuration === 1440){
                time = '1 Day'
            } else if (channel.autoArchiveDuration === 4320){
                time = "3 Days"
            } else if (channel.autoArchiveDuration === 10080){
                time = '7 Days'
            } else if (channel.autoArchiveDuration === 'MAX'){
                time = '7 Days'
            }
            const embed = new MessageEmbed()
            .setTitle(`${channel.name}`)
            .setDescription(`${channel}`)
            .addField('General Information', `**Created:** ${moment(channel.createdAt).format("LL")}\n**Parent:** ${channel.parent}\n**Auto-Archive:** ${time}\n**RateLimit:** ${channel.rateLimitPerUser}s`, true)
            .addField('Stats', `**Members:** ${channel.memberCount}\n**Messages:** ${channel.messageCount}`, true)
            .setFooter(`ID: ${channel.id}`)
            .setColor('#2f3136')

            return await message.channel.send({ embeds: [embed] })
        }



        await message.channel.send({ embeds: [embed] })
    }
}