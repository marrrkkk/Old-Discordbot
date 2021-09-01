const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "dog",
    description: "...",

    async run (client, message, args){
        fetch("https://random.dog/woof.json")
        .then(res => res.json())
        .then(async json => {
            const dog = new MessageEmbed()
            .setImage(json.url)
            .setColor("RANDOM")

            try {
                message.channel.send({ embeds: [dog] })
                
            } catch (error) {
                
            }
        })
    }
}