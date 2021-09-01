const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
    name: "meme",
    description: "...",

    async run (client, message){
        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json())
        .then(async json => {
            const meme = new MessageEmbed()
            .setTitle(json.title)
            .setImage(json.url)
            .setFooter(`${json.subreddit} ${json.postLink}`)
            .setColor("ORANGE")

            let msg = await message.reply({ content: "Finding a meme...", allowedMentions:{repliedUsers: false}})
            msg.edit({ embeds: [meme] })

        })
    }
}