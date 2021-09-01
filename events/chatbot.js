const client = require('../index')

const db = require('quick.db')

const fetch = require('node-fetch')

client.on('messageCreate', async message => {
    if(message.author.bot) return
    let chat = db.get(`chatbot_${message.guild.id}`)
    if(chat === null) return

    if(message.channel.id !== chat) return;

    fetch.default(`https://api.monkedev.com/fun/chat?msg=${message.content}&uid=${message.author.id}`)
    .then(res => res.json())
    .then(data => {
        try {
            client.channels.cache.get(chat).send(data.response)
            
        } catch (error) {
            console.log(error)
            message.channel.send("An error occured")
            
        }
    })
})