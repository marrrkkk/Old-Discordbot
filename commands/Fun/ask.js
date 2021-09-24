const { Client, Message } = require('discord.js')

module.exports = {
    name: 'ask',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(!args[0]) return message.reply({ content: "❓ Please ask a question", allowedMentions:{repliedUsers:false}})
        let replies = ["yes", "no", "It is certain", "Without a doubt", "Yes, definitely", "As I see it, yes", "Most likely", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Don't count on it", "My reply is no", "My sources say no", "Very doubtful"]

        let result = Math.floor(Math.random() * replies.length)

        message.reply({ content: replies[result], allowedMentions:{repliedUsers:false}}).catch(e => console.log(e))
    }
}