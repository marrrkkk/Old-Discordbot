const {Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'botinfo',
    aliases: ['about'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        let days = Math.floor(client.uptime / 86400000 );
        let hours = Math.floor(client.uptime / 3600000 ) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new MessageEmbed()
        .setTitle("<:Bot:873923621247127612> About Me")
        .addField('Name', "Tet#2652", true)
        .addField(`Created `, `August 23, 2021`, true)
        .addField('Developer', `[qwertyuioasdfghjklzxcvbnm#1312](https://discord.com/users/814406096022011934)`)
        .addField("Stats", `> ${client.guilds.cache.size} Servers\n> ${client.users.cache.size} Users`)
        .addField('Package Info', '```fix\nOS - Windows 10\nNode.js - v16.6.0\nDiscord.js - v13.1.0\nQuick.db - v7.1.3\n```')
        .addField('Uptime', `\`\`\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`\`\``)
        .setColor('#2f3136')
        .setTimestamp()

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}