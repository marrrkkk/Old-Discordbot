const client = require('../index')

const { MessageEmbed } = require('discord.js')

const dbb = require('quick.db')

const moment = require('moment')

//member join
client.on('guildMemberAdd', async (member) => {
    try {
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
    
        await client.channels.cache.get(chx).send({ embeds: [wembed] })
        
    } catch (error) {
        console.log(error)
        
    }
})

//member leave
client.on('guildMemberRemove', async (member) => {
    try {
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
    
        await client.channels.cache.get(chs).send({ embeds: [gembed] })
    } catch (error) {
        console.log(error)
        
    }
})

//channel create
client.on('channelCreate', async (channel) => {
    try {
        if(channel.type === 'GUILD_TEXT'){
            var type = '<:channel:873923621037436968> Text'
        }else if(channel.type === 'GUILD_VOICE'){
            var type = '<:VC:873923621100335155> Voice'
        }else if(channel.type === 'GUILD_CATEGORY'){
            var type = '<:channel:873923621037436968> Category'
        }else if(channel.type === 'GUILD_NEWS'){
            var type = '<:blurpleannouncements:879212267588182086> News'
        }else if(channel.type === 'GUILD_STAGE_VOICE'){
            var type = '<:stage:879811047920369725> Stage'
        }else if(channel.type === 'GUILD_STORE'){
            var type = 'Store'
        }else if(!channel.type){
            var type = 'Unknown'
        }

        let cch = dbb.get(`setlogs_${channel.guild.id}`)
        if(cch === null){
            return;
        }
        const hccembed = new MessageEmbed()
        .setTitle(`<:channel:873923621037436968> Channel Created`)
        .addField('Type', type)
        .addField(`Channel Name`, channel.name)
        .addField(`Channel ID`, channel.id)
        .setTimestamp()
        .setColor("BLURPLE")
    
        await client.channels.cache.get(cch).send({ embeds: [hccembed] })
        
    } catch (error) {
        console.log(error)
        
    }
})

//channel delete
client.on('channelDelete', async (channel) => {
    try {
        if(channel.type === 'GUILD_TEXT'){
            var type = '<:channel:873923621037436968> Text'
        }else if(channel.type === 'GUILD_VOICE'){
            var type = '<:VC:873923621100335155> Voice'
        }else if(channel.type === 'GUILD_CATEGORY'){
            var type = '<:channel:873923621037436968> Category'
        }else if(channel.type === 'GUILD_NEWS'){
            var type = '<:blurpleannouncements:879212267588182086> News'
        }else if(channel.type === 'GUILD_STAGE_VOICE'){
            var type = '<:stage:879811047920369725> Stage'
        }else if(channel.type === 'GUILD_STORE'){
            var type = 'Store'
        }else if(!channel.type){
            var type = 'Unknown'
        }

        let dch = dbb.get(`setlogs_${channel.guild.id}`)
        if(dch === null){
            return;
        }
        const dccembed = new MessageEmbed()
        .setTitle(`<:channel:873923621037436968> Channel Deleted`)
        .addField('Type', type)
        .addField(`Channel Name`, channel.name)
        .addField(`Channel ID`, channel.id)
        .setTimestamp()
        .setColor("DARKER_GREY")
    
        await client.channels.cache.get(dch).send({ embeds: [dccembed] })
        
    } catch (error) {
        console.log(error)
        
    }
})

//channel update
client.on('channelUpdate', async (oldChannel, newChannel) => {
    try {
        let uch = dbb.get(`setlogs_${oldChannel.guild.id}`)
        if(uch === null){
            return;
        }
        if(oldChannel.type === 'GUILD_TEXT'){
            var type = '<:channel:873923621037436968> Text'
        }else if(oldChannel.type === 'GUILD_VOICE'){
            var type = '<:VC:873923621100335155> Voice'
        }else if(oldChannel.type === 'GUILD_CATEGORY'){
            var type = '<:channel:873923621037436968> Category'
        }else if(oldChannel.type === 'GUILD_NEWS'){
            var type = '<:blurpleannouncements:879212267588182086> News'
        }else if(oldChannel.type === 'GUILD_STAGE_VOICE'){
            var type = '<:stage:879811047920369725> Stage'
        }else if(oldChannel.type === 'GUILD_STORE'){
            var type = 'Store'
        }else if(!oldChannel.type){
            var type = 'Unknown'
        }

        if(oldChannel.name !== newChannel.name){
            const chu = new MessageEmbed()
            .setTitle(`<:channel:873923621037436968> Channel Updated`)
            .addField('Type', type)
            .addField(`Before`, oldChannel.name, true)
            .addField(`After`, newChannel.name, true)
            .setTimestamp()
            .setColor("ORANGE")
            .setFooter(`Channel ID: ${newChannel.id}`)
    
            await client.channels.cache.get(uch).send({ embeds: [chu] })
        }
        
    } catch (error) {
        console.log(error)
        
    }
})

//thread create
client.on('threadCreate', async (thread) => {
    try {
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
    
        await client.channels.cache.get(tch).send({ embeds: [tembed] })
        
    } catch (error) {
        console.log(error)
        
    }
})

//thread delete
client.on('threadDelete', async (thread) => {
    try {
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
    
        await client.channels.cache.get(tdch).send({ embeds: [tdembed] })
        
    } catch (error) {
        console.log(error)
        
    }
})

//role create
client.on('roleCreate', async (role) => {
    try {
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
    
        await client.channels.cache.get(rc).send({ embeds: [crc] })
        
    } catch (error) {
        console.log(error)
        
    }
})

//role delete
client.on('roleDelete', async (role) => {
    try {
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
    
        await client.channels.cache.get(drc).send({ embeds: [dcrc] })
        
    } catch (error) {
        console.log(error)
        
    }
})