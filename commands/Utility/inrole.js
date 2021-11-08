const {Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'inrole',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('left')
            .setEmoji('<:left:899988427137773568>')
            .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('right')
            .setEmoji('<:right:899988427146166363>')
            .setStyle('PRIMARY')
        )

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || 
        message.guild.roles.cache.find(r => r.name === args.join(' ')) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' '))
        if(!args[0]) return message.channel.send("<:cross:873923620517347389> Please provide a role")
        if(!role) return message.channel.send(`Couldn't find role "${args.join(' ')}"`)
        
        let a = []
        role.members.forEach((x) => a.push(`${x.user.tag} (\`${x.user.id}\`)`))

        if(a.length === 0){
            const embed = new MessageEmbed()
            .setTitle(`Members in role ${role.name} - ${role.members.size}`)
            .setDescription(`No Users in this role`)
            .setColor(role.color)
            .setFooter('Page - 1/1')

            return message.channel.send({ embeds: [embed] })
        }

        let i0 = 0
        let i1 = 10
        let page = 1

        let s = a.slice(0, 10)
        let map = s.map((y) => y).join(`\n`)
        const embed = new MessageEmbed()
        .setTitle(`Members in role ${role.name} - ${role.members.size}`)
        .setDescription(`${map}`)
        .setColor(role.color)
        .setFooter(`Page - ${page}/${Math.ceil(role.members.size / 10)}`)

        let msg = await message.channel.send({ embeds: [embed], components: [row] })
        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'})

        collector.on('collect', async b => {
            if(b.user.id !== message.author.id) return await b.reply({ content: 'This button is not for you', ephemeral: true})
            if(b.customId === 'left'){
                b.deferUpdate()
                if(page <= 1) return
                if(page > Math.ceil(role.members.size / 10)) return

                i0 = i0 - 10
                i1 = i1 - 10
                page = page - 1

                let idk0 = a.slice(i0, i1)
                let map0 = idk0.map((y) => y).join(`\n`)
                const embed0 = new MessageEmbed()
                .setTitle(`Members in role ${role.name} - ${role.members.size}`)
                .setDescription(`${map0}`)
                .setColor(role.color)
                .setFooter(`Page - ${page}/${Math.ceil(role.members.size / 10)}`)

                return await msg.edit({ embeds: [embed0] })
            }

            if(b.customId === 'right'){
                b.deferUpdate()
                if(page >= Math.ceil(role.members.size / 10)) return

                i0 = i0 + 10
                i1 = i1 + 10
                page = page + 1

                let idk1 = a.slice(i0, i1)
                let map1 = idk1.map((y) => y).join(`\n`)
                const embed1 = new MessageEmbed()
                .setTitle(`Members in role ${role.name} - ${role.members.size}`)
                .setDescription(`${map1}`)
                .setColor(role.color)
                .setFooter(`Page - ${page}/${Math.ceil(role.members.size / 10)}`)

                return await msg.edit({ embeds: [embed1] })
            }
        })
        
    }
}