const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "waifu-nsfw",
    description: "...",

    async run (client, message){
        if(!message.channel.nsfw){
            const er = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("<:channel_nsfw:873923620517322782> This command only works in a NSFW Channel")
            .setColor("RED")

            message.channel.send({ embeds: [er] })
        } else {
            fetch("https://api.waifu.pics/nsfw/waifu")
            .then(res => res.json())
            .then(async json => {
                const embed = new MessageEmbed()
                .setImage(json.url)
                .setColor("RED")

                try {
                    await message.channel.send({ embeds: [embed] })
                    
                } catch (error) {
                    
                }
            })
        }
    }
}