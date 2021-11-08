const {Client, Message, Permissions } = require('discord.js')

module.exports = {
    name: 'guildinvite',
    aliases: ['getinv', 'getinvite'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const guild = client.guilds.cache.get(args[0])

        try {
            if(!guild) return message.channel('Not a valid guild ID')

            let tChannel = guild.channels.cache.find(ch => ch.type == "GUILD_TEXT" && ch.permissionsFor(ch.guild.me).has(Permissions.FLAGS.CREATE_INSTANT_INVITE));
            if(!tChannel) return await message.channel.send('<:cross:873923620517347389> No permission found')
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return message.channel.send(`<:cross:873923620517347389> An error has occured!`);
            })
            await message.channel.send(invite.url)
        } catch (error) {
            console.log(error)
        }
    }
}