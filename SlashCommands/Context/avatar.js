const { Client, ContextMenuInteraction, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'Avatar',
    type: 'USER',

    /**
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */

    run: async(client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.targetId)

        try {
            const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setImage(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor('#2f3136')
    
            interaction.followUp({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}