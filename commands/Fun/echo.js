module.exports = {
    name: "echo",
    description: "send message to a channel",

    async run (client, message, args){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const chn = message.mentions.channels.first()
        const msg = args.join(" ")

        if(!msg) return message.reply({ content: "Please specify a message\nUsage: `,echo <#channel> [message]`", allowedMentions: {repliedUsers: false}})
        if(!chn){
            message.channel.send(msg).catch(er => console.log(er))
        } else {
            chn.send(msg).catch(e => console.log(e))
        }
    }
}