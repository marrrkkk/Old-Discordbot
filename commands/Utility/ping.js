const {Client, Message } = require('discord.js')

module.exports = {
    name: 'ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        message.channel.send('Pong').then(msg => {
            const ping = msg.createdTimestamp - message.createdTimestamp;
            msg.edit(`Ping - \`${ping}ms\``)
        })
    }
}