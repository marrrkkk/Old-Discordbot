const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'inrole',

    async run (client, message, args){
        let role = message.mentions.roles.first()
        let a = []
        role.members.forEach((x) => a.push(`${x.user.tag}`))
        let page = 1
        let m = 10
        let e = page * m
        let s = e - m

        let idk = a.slice(s, e)
        let map = idk.map((y) => y).join(`\n`)
        const embed1 = new MessageEmbed()
        .setTitle(`Members in role ${role.name}`)
        .setDescription(`${map}`)
        .setColor(role.color)

        message.channel.send({ embeds: [embed1] })
    }
}