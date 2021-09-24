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
        .addField('Name', "Tet#2652")
        .addField(`Created `, `23-08-2021`)
        .addField('Developer', `[qwertyuioasdfghjklzxcvbnm#1312](https://discord.com/users/814406096022011934)`)
        .addField("Total Server", `${client.guilds.cache.size} servers`)
        .addField('Uptime', `\`\`\`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\`\`\``)
        .setColor('BLURPLE')
        .setTimestamp()

        await message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    }
}