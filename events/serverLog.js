const client = require('../index')

const { MessageEmbed } = require('discord.js')

const dbb = require('quick.db')

const moment = require('moment')

//member join
client.on('guildMemberAdd', async (member) => {
    let chx = dbb.get(`setlogs_${member.guild.id}`);
    if(chx === null){
        return;
    }
    const wembed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTitle(`<:join:873923620890632262> Member Joined`)
    .setDescription(`<@${member.id}> joined the server`)
    .addField("User ID: ", `${member.id}`)
    .setFooter(`Account Created: ${moment(member.user.createdAt).format("DD-MM-YYYY")}`)
    .setColor("GREEN")

    try {
        client.channels.cache.get(chx).send({ embeds: [wembed] })
    } catch (error) {
        console.log(error)
    }
})

//member leave
client.on('guildMemberRemove', async (member) => {
    let chs = dbb.get(`setlogs_${member.guild.id}`)
    if(chs === null){
        return;
    }
    const gembed = new MessageEmbed()
    .setAuthor(member.user.tag, member.user.displayAvatarURL())
    .setTitle(`<:leave:879767669157548162> Member Left`)
    .setDescription(`<@${member.id}> left the server`)
    .addField("User ID: ", `${member.id}`)
    .setFooter(`Account created: ${moment(member.user.createdAt).format("DD-MM-YYYY")}`)
    .setColor("RED")

    try {
        client.channels.cache.get(chs).send({ embeds: [gembed] })
        
    } catch (error) {
        console.log(error)
    }
})

//channel create
client.on('channelCreate', async (channel) => {
    let cch = dbb.get(`setlogs_${channel.guild.id}`)
    if(cch === null){
        return;
    }
    const hccembed = new MessageEmbed()
    .setTitle(`<:channel:873923621037436968> Channel Created`)
    .addField(`Channel Name`, channel.name)
    .addField(`Channel ID`, channel.id)
    .setTimestamp()
    .setColor("BLURPLE")

    try {
        client.channels.cache.get(cch).send({ embeds: [hccembed] })
        
    } catch (error) {
        
    }
})

//channel delete
client.on('channelDelete', async (channel) => {
    let dch = dbb.get(`setlogs_${channel.guild.id}`)
    if(dch === null){
        return;
    }
    const dccembed = new MessageEmbed()
    .setTitle(`<:channel:873923621037436968> Channel Deleted`)
    .addField(`Channel Name`, channel.name)
    .addField(`Channel ID`, channel.id)
    .setTimestamp()
    .setColor("DARKER_GREY")

    try {
        client.channels.cache.get(dch).send({ embeds: [dccembed] })
        
    } catch (error) {
        
    }
})

//channel update
client.on('channelUpdate', async (oldChannel, newChannel) => {
    let uch = dbb.get(`setlogs_${oldChannel.guild.id}`)
    if(uch === null){
        return;
    }
    if(oldChannel.name !== newChannel.name){
        const chu = new MessageEmbed()
        .setTitle(`<:channel:873923621037436968> Channel Updated`)
        .addField(`Before`, oldChannel.name, true)
        .addField(`After`, newChannel.name, true)
        .setTimestamp()
        .setColor("ORANGE")
        .setFooter(`Channel ID: ${newChannel.id}`)
    
        try {
            client.channels.cache.get(uch).send({ embeds: [chu] })
            
        } catch (error) {
            
        }
    }

})

//thread create
client.on('threadCreate', async (thread) => {
    let tch = dbb.get(`setlogs_${thread.guild.id}`)
    if(tch === null){
        return;
    }

    const tembed = new MessageEmbed()
    .setTitle(`🧵 Thread Created`)
    .addField(`Thread Name`, thread.name)
    .addField(`Thread ID`, thread.id)
    .setTimestamp()
    .setColor("BLURPLE")

    try {
        client.channels.cache.get(tch).send({ embeds: [tembed] })
        
    } catch (error) {
        
    }
})

//thread delete
client.on('threadDelete', async (thread) => {
    let tdch = dbb.get(`setlogs_${thread.guild.id}`)
    if(tdch === null){
        return;
    }

    const tdembed = new MessageEmbed()
    .setTitle(`🧵 Thread Deleted`)
    .addField(`Thread Name`, thread.name)
    .addField(`Thread ID`, thread.id)
    .setTimestamp()
    .setColor("RED")

    try {
        client.channels.cache.get(tdch).send({ embeds: [tdembed] })
        
    } catch (error) {
        
    }
})

//role create
client.on('roleCreate', async (role) => {
    let rc = dbb.get(`setlogs_${role.guild.id}`)
    if(rc === null){
        return;
    }
    const crc = new MessageEmbed()
    .setTitle(`<:atsign:879212267315544085> Role Created`)
    .setDescription(`**Name: **${role.name}\n**Color: **${role.hexColor}\n**Hoisted: **${role.hoist}\n**Mentionable: **${role.mentionable}`)
    .setTimestamp()
    .setColor("BLUE")
    .setFooter(`Role ID: ${role.id}`)

    try {
        client.channels.cache.get(rc).send({ embeds: [crc] })
        
    } catch (error) {
        
    }
})

//role delete
client.on('roleDelete', async (role) => {
    let drc = dbb.get(`setlogs_${role.guild.id}`)
    if(drc === null){
        return;
    }
    const dcrc = new MessageEmbed()
    .setTitle(`<:atsign:879212267315544085> Role Deleted`)
    .setDescription(`**Name: **${role.name}\n**Color: **${role.hexColor}\n**Hoisted: **${role.hoist}\n**Mentionable: **${role.mentionable}`)
    .setTimestamp()
    .setColor("DARKER_GREY")
    .setFooter(`Role ID: ${role.id}`)

    try {
        client.channels.cache.get(drc).send({ embeds: [dcrc] })
        
    } catch (error) {
        
    }
})