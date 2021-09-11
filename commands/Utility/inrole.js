const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'inrole',

    async run (client, message, args){
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' '))
        if(!role){
            return message.channel.send("<:cross:873923620517347389> Please provide a valid role")
        }
        let a = []
        role.members.forEach((x) => a.push(x.user.username))

        let i0 = 0
        let i1 = 10
        let page = 1

        let s = a.slice(0, 10)
        let map = s.map((y) => y).join(`\n`)
        const ir = new MessageEmbed()
        .setTitle(`Members in role ${role.name} - ${role.members.size}`)
        .setDescription(`${map}`)
        .setColor(role.color)
        .setFooter(`Page - ${page}/${Math.ceil(role.members.size / 10)}`)

        const filter = (reaction, user) => ['⬅', '➡'].includes(reaction.emoji.name) && (message.author.id === user.id)
        let msg = await message.channel.send({ embeds: [ir] })
        await msg.react('⬅')
        await msg.react('➡')

        let collector = msg.createReactionCollector(filter)

        collector.on('collect', async (reaction, user) => {
            if(reaction.emoji.name === '⬅'){
                reaction.users.remove(message.author.id)
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
            if(reaction.emoji.name === '➡'){
                reaction.users.remove(message.author.id)
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