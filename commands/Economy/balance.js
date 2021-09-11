const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "balance",
    alsiases: ['bal'],

    async run (client, message, args){
        let user = message.mentions.members.first() || message.member;

        var bal = await db.fetch(`balance_${message.guild.id}_cash_${user.id}`)
        if(bal === null) bal = 0;

        var cash = db.fetch(`balance_${message.guild.id}_cash_${message.author.id}`) | 0

        const mbal = new MessageEmbed()
        .setTitle(`${user.displayName}'s Bank`)
        .addField('Balance', `<a:coins:881937190454693988> \`${bal} coins\``)
        .setColor('LUMINOUS_VIVID_PINK')
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

        message.channel.send({ embeds: [mbal] })
    }
}