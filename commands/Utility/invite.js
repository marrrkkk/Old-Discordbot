const {Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    name: 'invite',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel("Invite me")
          .setURL("https://discord.com/oauth2/authorize?client_id=879042410691301386&scope=applications.commands+bot&permissions=3161844862")
          .setStyle("LINK")
        )
        .addComponents(
            new MessageButton()
            .setLabel("Vote")
            .setURL("https://top.gg/bot/879042410691301386")
            .setStyle('LINK')
        )
        const embed = new MessageEmbed()
        .setTitle('<:link:879811047857487922> Links')
        .setDescription("Invite me using the botton below\n \n[Github](https://github.com/yayeen)\n[Support Server](https://discord.gg/tgKDvS3XRA)\nWebsite `(coming soon)`")
        .setColor("LUMINOUS_VIVID_PINK")

        await message.channel.send({ embeds: [embed], components: [row] }).catch(e => console.log(e))
    }
}