const ms = require('ms')

module.exports = {
    name: "remind",
    aliases: ['rm'],

    async run (client, message, args){
        let time = args[0]

        if(!time) return message.reply({ content: "Please provide a time", allowedMentions:{repliedUsers:false}})
        if(!time.endsWith("s") && !time.endsWith("m") && !time.endsWith("h") && !time.endsWith("d")){
            return message.reply({ content: "Please provide a valid time format e.g. `,remind 5m test`", allowedMentions:{repliedUsers:false}})
        }

        let reason = args.slice(1).join(" ")
        if(!reason) reason = "something"

        message.reply(`I'll remind you about \`${reason}\` in ${time}`)

        setTimeout(async () => {
            await message.member.send(`You set a reminder about \`${reason}\` ${time} ago`)
        }, ms(time))
    }
}