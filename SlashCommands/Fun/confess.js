const { Client, CommandInteraction, MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
    name: "confess",
    description: "Sent an anonymous confession",
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'text',
            description: 'Enter your confession',
            type: "STRING",
            required: true
        },
        {
            name: 'attachment',
            description: 'Put the link of your attachment',
            type: "STRING",
            required: false
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
            let prefix = db.get(`prefix_${interaction.guild.id}`)
            if(prefix === null) prefix = ','

            let ch = db.get(`setcfs_${interaction.guild.id}`)
            if(ch === null) {
                const fail = new MessageEmbed()
                .setTitle('<:cross:873923620517347389> Error')
                .setDescription(`Confession Channel has not been set yet.\n\nTo set one do \`,confession\` on your desired channel`)
                .setColor('RED')

                return await interaction.editReply({ embeds: [fail]})
            }

            const channel = await client.channels.cache.get(ch)
            await interaction.deferReply({ ephemeral: true }).catch(() => {})

            const confess = interaction.options.getString("text")
            if(confess.length > 1500) {
                const fail2 = new MessageEmbed()
                .setTitle('<:cross:873923620517347389> Error')
                .setDescription('Your confession is too long! Max is 2000 characters')
                .setColor('RED')

                return await interaction.editReply({ embeds: [fail2] })
            }
            const attachment = interaction.options.getString("attachment")
            if(attachment){
                function validateUrl(value) {
                    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
                  }

                const url = validateUrl(attachment)
                if(url === true){
                    if(!attachment.endsWith('.png' || '.jpg' || '.jpeg' || '.gif')){
                        const fail3 = new MessageEmbed()
                        .setTitle('<:cross:873923620517347389> Invalid Attachment')
                        .setDescription('Files must end with \`.png\`, \`.jpg\`, \`.jpeg\`, or \`.gif\`')
                        .setColor('RED')
        
                        return await interaction.editReply({ embeds: [fail3]})
                    }
                } else {
                    const fail4 = new MessageEmbed()
                    .setTitle('<:cross:873923620517347389> Invalid Attachment')
                    .setDescription(`"${attachment}" is not a valid url`)
                    .setColor('RED')

                    return await interaction.editReply({ embeds: [fail4] })
                }
            }

            let count = await db.add(`count_${interaction.guild.id}`, 1)
            if(count === null){
                await db.set(`count_${interaction.guild.id}`, 1)
            }

            const success = new MessageEmbed()
            .setAuthor(`Confession sent`, interaction.guild.iconURL())
            .setDescription(`${interaction.user}, your confession has been posted to ${channel}`)
            .setColor('GREEN')
            .setFooter(`Confession ID: #${count}`)

            const confession = new MessageEmbed()
            .setAuthor(`Confession #${count}`, interaction.guild.iconURL())
            .setDescription(`${confess}`)
            .setImage(attachment || null)
            .setFooter(`To confess type /confess <message> or dm ",confess"`)
            .setColor('RANDOM')

            return await interaction.editReply({embeds: [success]}).then(async () => await channel.send({ embeds: [confession] }))
        } catch (error) {
            console.log(error)
        }
    },
};