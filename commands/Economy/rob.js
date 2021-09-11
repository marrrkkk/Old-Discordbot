const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "rob",
    aliases: ["steal"],

    async run (client, message, args){
        let user = message.mentions.members.first()
        if(!user) return;
        let userBal = await db.fetch(`balance_${message.guild.id}_cash_${user.id}`)

        if(userBal === 0 || userBal < 0) return message.reply({ content: "You can't rob a homeless man", allowedMentions:{repliedUsers:false}})

        let payout = Math.floor(Math.random() * 1000) + 1;

        const rob = new MessageEmbed()
        .setTitle(`<a:rob:882087294734053437> ${message.author.username} just rob someone!`)
        .setDescription(`${message.author.username} robbed <a:coins:881937190454693988> \`${payout}\` from ${user.displayName}`)
        .setColor('GREEN')

        message.channel.send({ embeds: [rob] })

        await db.subtract(`balance_${message.guild.id}_cash_${user.id}`, payout)
        await db.add(`balance_${message.guild.id}_cash_${message.author.id}`, payout)
    }
}