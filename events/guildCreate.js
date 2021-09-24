const client = require('../index')
const { channel } = require('../config.json')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('quick.db')

client.on('guildCreate', async guild => {
    const limit = guild.members.cache.filter(m => m.user.bot).size
    const owner = guild.ownerId
    let prefix = db.fetch(`prefix_${guild.id}`)
    if(prefix === null) prefix = ','
    let channelTosend
    guild.channels.cache.forEach(channel => {
        if(
            channel.type === 'GUILD_TEXT' &&
            !channelTosend &&
            channel.permissionsFor(guild.me).has("SEND_MESSAGES")
        ) channelTosend = channel
    })

    if(!channelTosend) return
    try {
        if(limit < 10){
            await client.users.cache.get(owner).send(`Sorry I had to leave your server **${guild.name}**\n**Reason:** Server under 10 members`).catch(e => console.log(e))
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Support Server')
                .setURL('https://discord.gg/tgKDvS3XRA')
                .setStyle('LINK')
            )
            const embed = new MessageEmbed()
            .setAuthor(client.user.tag, client.user.displayAvatarURL())
            .setDescription(`Sorry I had to leave your server **${guild.name}**\n**Reason:** Server under 10 members\n\nInvite more members or wait for me until i get verified by Discord`)

            await channelTosend.send({ embeds: [embed], components: [row] })
            await guild.leave()
        } else {
            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Invite')
                .setURL('https://discord.com/oauth2/authorize?client_id=879042410691301386&scope=applications.commands+bot&permissions=3161844862')
                .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                .setLabel('Support')
                .setURL('https://discord.gg/tgKDvS3XRA')
                .setStyle('LINK')
            )
            const embed = new MessageEmbed()
            .setTitle(`${client.user.username}`)
            .setDescription(`Thank you for inviting me!\nMy prefix is \`${prefix}\``)

            await channelTosend.send({ embeds: [embed], components: [row] })
        }
    } catch (error) {
        console.log(error)
    }
})

client.on('guildCreate', async guild => {
    try {
        const embed = new MessageEmbed()
        .setTitle('Server Joined')
        .addField('Guild Name', `${guild.name}`)
        .addField('Members', `${guild.memberCount}`)
        .addField('Owner', `<@${guild.ownerId}>\n(${guild.ownerId})`)
        .addField('Total Servers', `${client.guilds.cache.size} Servers`)
        .setThumbnail(guild.iconURL())
        .setFooter(`Guild ID: ${guild.id}`)
        .setColor('GREEN')

        await client.channels.cache.get(channel).send({ embeds: [embed] })
    } catch (error) {
        console.log(error)
    }
})