const {Client, Message, MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'roleinfo',
    aliases: ['role'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const rRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('perms')
            .setLabel('Permissions')
            .setStyle('PRIMARY')
        )
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || 
        message.guild.roles.cache.find(r => r.name === args.join(' ')) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' '))
        if(!args[0]) role = message.guild.roles.cache.find(r => r.name.toLowerCase() === '@everyone')
        if(!role) return message.channel.send(`Couldn't find role "${args.join(' ')}"`)

        const rEmbed = new MessageEmbed()
        .setTitle(`<:atsign:879212267315544085> Role Information`)
        .setDescription(`${role}`)
        .addField("Name", `${role.name}`, true)
        .addField("Color", `${role.hexColor}`, true)
        .addField("Mentionable", `${role.mentionable}`, true)
        .addField("Members", `${role.members.size}`, true)
        .addField("Managed", `${role.managed}`, true)
        .addField("Created", `${moment(role.createdAt).format("LL")}`, true)
        .setFooter(`Role ID: ${role.id}`)
        .setColor(role.color)

        if(role.permissions.has('ADMINISTRATOR')){
            rEmbed.addField("Permissions", `\`\`\`\nAdministrator\n\`\`\``)
            return await message.channel.send({ embeds: [rEmbed] })
        } else {
            let msg = await message.channel.send({ embeds: [rEmbed], components: [rRow] })
            const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'})

            collector.on('collect', async b => {
                if(b.user.id === message.author.id){
                    b.deferUpdate()
                    if(b.customId === 'perms'){
                        const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId('back')
                            .setLabel('Back')
                            .setStyle('SECONDARY')
                        )

                        const embed = new MessageEmbed()
                        .setTitle(`<:atsign:879212267315544085> Role Permissions`)
                        .setDescription(`${role}`)
                        .addField("Guild Permissions", `\`\`\`\n${role.permissions.toArray().map(p => p).join('\n')}\n\`\`\``, true)
                        .setColor(role.color)

                        let msg2 = await msg.edit({ embeds: [embed], components: [row] })
                        const collector1 = msg2.createMessageComponentCollector({ componentType: 'BUTTON'})

                        collector1.on('collect', async c => {
                            if(c.user.id === message.author.id){
                                if(c.customId === 'back'){
                                    await msg.edit({ embeds: [rEmbed], components: [rRow] })
                                }
                            } else {
                                c.reply({ content: 'This button is not for you', ephemeral: true })
                            }
                        })
                    }
                } else {
                    b.reply({ content: "This button is not for you", ephemeral: true })
                }
            })
        }
    }
}