const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

module.exports = {
    name: "invite",
    aliases: ['inv'],

    async run (client, message, args){
        const inv = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setLabel("Invite me")
          .setURL("https://discord.com/oauth2/authorize?client_id=879042410691301386&scope=applications.commands+bot&permissions=3161844862")
          .setStyle("LINK")
        )
        const invv = new MessageEmbed()
        .setTitle('<:link:879811047857487922> Links')
        .setDescription("Invite me using the botton below\n \n[Github](https://github.com/yayeen)\nWebsite `(coming soon)`\nSupport Server `(coming soon)`")
        .setColor("LUMINOUS_VIVID_PINK")

        message.channel.send({ embeds: [invv], components: [inv] }).catch(e => console.log(e))
    }
}