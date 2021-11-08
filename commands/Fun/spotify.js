const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'spotify',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        if(!member) return

        const activity = member.presence.activities.find(a => a.name === 'Spotify')

        if(activity){
            const embed = new MessageEmbed()
            .setTitle('<:spotify:894518361344589824>  Spotify')
            .setDescription(`**[${activity.details}](https://open.spotify.com/track/${activity.syncId})**\nby ${activity.state}\non ${activity.assets.largeText}`)
            .setThumbnail(`https://i.scdn.co/image/${activity.assets.largeImage.slice(8)}`)
            .setColor('GREEN')
            .setFooter(member.user.username, member.user.displayAvatarURL())

            return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
        } else {
            return message.channel.send(`**${member.displayName}** isn't listening to Spotify`)
        }
    }
}