const { MessageEmbed, Message } = require("discord.js");
const moment = require('moment');

module.exports = {
    name: "snipe",
    aliases: ['s'],

    async run (client, message, args){
        const snipes = client.snipes.get(message.channel.id)
        if(!snipes) return message.reply({ content: "There's nothing to snipe", allowedMentions:{repliedUsers:false} })

        const snipe = +args[0] - 1 || 0;
        const target = snipes[snipe]

        if(!target) return message.reply({ content: `There's only ${snipes.length} message to snipe`, allowedMentions:{repliedUsers:false} })

        const { msg, time, image } = target

        const snipeEmbed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setImage(image)
        .setDescription(msg.content)
        .setFooter(`${moment(time).fromNow()} | ${snipe + 1} / ${snipes.length}`)
        .setColor("RANDOM")

        message.channel.send({ embeds: [snipeEmbed] })

        
    }
}