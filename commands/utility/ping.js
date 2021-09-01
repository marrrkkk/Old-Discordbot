module.exports = {
    name: "ping",
    description: "Shows bot ws ping",

    async run (client, message, args){
        message.reply({ content: `Pong`, allowedMentions: {repliedUsers: false}}).then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit({ content: `Ping - \`${ping}ms\``, allowedMentions: {repliedUsers: false}})
        })
    }
}