const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: 'bots',

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

        let i0 = 0
        let i1 = 10
        let page = 1

        const bot = message.guild.members.cache.filter(m => m.user.bot).size
        let description = message.guild.members.cache.filter(m => m.user.bot).map(m => m).slice(0, 10).join("\n")

        const embed = new MessageEmbed()
        .setAuthor(`List of Bots [${bot}]`, message.guild.iconURL())
        .setDescription(`${description}`)
        .setFooter(`Page - ${page}/${Math.ceil(bot / 10)}`)
        .setColor('BLURPLE')

        let msg = await message.channel.send({ embeds: [embed], components: [row] });
        const collector = msg.createMessageComponentCollector({ componentType: 'BUTTON'})

        collector.on('collect', async b => {
            b.deferUpdate()
            if(b.user.id !== message.author.id) return
            if(b.customId === 'left'){
    
                if(page <= 1) return
                if(page > Math.ceil(bot / 10)) return
    
                i0 = i0 - 10
                i1 = i1 - 10
                page = page - 1
    
                let description1 = message.guild.members.cache.filter(m => m.user.bot).map(m => m).slice(i0, i1).join("\n")
        
                const embed1 = new MessageEmbed()
                .setAuthor(`List of Bots [${bot}]`, message.guild.iconURL())
                .setDescription(`${description1}`)
                .setFooter(`Page - ${page}/${Math.ceil(bot / 10)}`)
                .setColor('BLURPLE')
    
                return await msg.edit({ embeds: [embed1] })
            }
    
            if(b.customId === 'right'){
              if(page >= Math.ceil(bot / 10)) return
    
                i0 = i0 + 10
                i1 = i1 + 10
                page = page + 1
    
                let description2 = message.guild.members.cache.filter(m => m.user.bot).map(m => m).slice(i0, i1).join("\n")
        
                const embed2 = new MessageEmbed()
                .setAuthor(`List of Bots [${bot}]`, message.guild.iconURL())
                .setDescription(`${description2}`)
                .setFooter(`Page - ${page}/${Math.ceil(bot / 10)}`)
                .setColor('BLURPLE')
    
                return await msg.edit({ embeds: [embed2] })
            }
          })
    }
}