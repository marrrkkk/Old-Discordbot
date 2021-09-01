const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "waifu",
    description: "...",

    async run (client, message){
        fetch("https://api.waifu.pics/sfw/waifu")
        .then(res => res.json())
        .then(async json => {
            const embed = new MessageEmbed()
            .setImage(json.url)
            .setColor("RANDOM")

            await message.channel.send({ embeds: [embed] })
        })
    }
}