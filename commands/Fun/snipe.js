const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: 'snipe',
    aliases: ['s'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('del')
            .setLabel('Delete')
            .setStyle('DANGER')
        )
        const snipes = client.snipes.get(message.channel.id)
        if(!snipes) return message.reply({ content: "There's nothing to snipe", allowedMentions:{repliedUsers:false} })

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe]

        if(!target) return message.reply({ content: `There's only ${snipes.length} message to snipe`, allowedMentions:{repliedUsers:false} })

        const { msg, time, image } = target

        const snipeEmbed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setImage(image)
        .setDescription(msg.content || `[no text]`)
        .setFooter(`${moment(time).fromNow()} | [${snipe + 1} / ${snipes.length}]`)
        .setColor("RANDOM")

        try {
            let msgs = await message.channel.send({ embeds: [snipeEmbed], components: [row] })
            const collector = msgs.createMessageComponentCollector({ componentType: 'BUTTON'});

            collector.on('collect', async b => {
                if(b.user.id === message.author.id){
                    await msgs.delete()
                } else {
                    await b.reply({ content: 'This button is not for you', ephemeral: true })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}