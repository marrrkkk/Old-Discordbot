const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = {
    name: "add-balance",
    aliases: ['addbal'],

    async run (client, message, args){
        let user = message.mentions.members.first() || message.member;

        let addBal = args[0]

        if(!args[0]) return message.reply({ content: "<:cross:873923620517347389> Please provide an amount", allowedMentions:{repliedUsers:false}})

        if(isNaN(args[0])) return message.reply({ content: "<:cross:873923620517347389> Please provide a valid number", allowedMentions:{repliedUsers:false}})

        if(args[0] > 100001) return message.reply({ content: "<:cross:873923620517347389> The max amount of coins you can give is `100,000`", allowedMentions:{repliedUsers:false}})

        db.add(`balance_${message.guild.id}_cash_${user.id}`, addBal)

        var bal = await db.fetch(`balance_${message.guild.id}_cash_${user.id}`)
        if(bal === null) bal = 0

        const tbal = new MessageEmbed()
        .setTitle('<:online:880155848284995634> Success')
        .setDescription(`Successfully added <a:coins:881937190454693988> \`${addBal} coins\` to ${user}`)
        .addField(`${user.displayName}'s Balance`, `<a:coins:881937190454693988> ${bal} coins`)
        .setColor('GREEN')

        message.channel.send({ embeds: [tbal] })
    }
}