const client = require('../index')
const db = require('quick.db')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')

client.on('guildMemberRemove', async member => {
    try {
        let channel = db.get(`setlogs_${member.guild.id}`)
        if(channel === null){
            return
        }
        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`<:leave:879767669157548162> Member Left`)
        .setDescription(`<@${member.id}> left the server`)
        .addField(`Joined Server`, `${moment(member.joinedAt).format("LL")} ||${moment(member.joinedAt).fromNow()}||`)
        .addField(`Account created`, `${moment(member.user.createdAt).format("LL")}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`User ID: ${member.id}`)
        .setColor("RED")
    
        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)    
    }
})