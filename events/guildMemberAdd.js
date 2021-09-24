const client = require('../index')
const db = require('quick.db')
const moment = require('module')
const { MessageEmbed } = require('discord.js')

client.on('guildMemberAdd', async member => {
    try {
        let channel = db.get(`setlogs_${member.guild.id}`);
        if(channel === null){
            return
        }

        const embed = new MessageEmbed()
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setTitle(`<:join:873923620890632262> Member Joined`)
        .setDescription(`<@${member.id}> joined the server`)
        .addField("User ID: ", `${member.id}`)
        .setFooter(`Account Created: ${moment(member.user.createdAt).format("DD-MM-YYYY")}`)
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setColor("GREEN")
    
        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})