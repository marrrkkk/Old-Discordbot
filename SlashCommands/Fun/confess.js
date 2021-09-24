const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: "confession",
    description: "Sent an anonymous confession",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'text',
            description: 'Enter your confession',
            type: "STRING",
            required: true
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            let ch = db.get(`setcfs_${interaction.guild.id}`)
            if(ch === null) return

            const channel = await client.channels.cache.get(ch)
            await interaction.deferReply({ ephemeral: true }).catch(() => {})

            const confess = interaction.options.getString("text")
            if(confess.length > 1500) return await interaction.editReply("Confession's too long! max is 1500 characters")

            await interaction.editReply({ content: `You confession has been sent to ${channel}`})
            const confession = new MessageEmbed()
            .setTitle('<:mail:879049788514005013> Confession')
            .setDescription(`${confess}`)
            .setFooter(`To confess type /confession <message>`)
            .setColor('LUMINOUS_VIVID_PINK')

            await channel.send({ embeds: [confession] })
        } catch (error) {
            console.log(error)
        }
    },
};