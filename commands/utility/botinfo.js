const { MessageEmbed } = require("discord.js");

const moment = require('moment')

module.exports = {
    name: "botinfo",
    description: "...",

    async run (client, message, args){

        let days = Math.floor(client.uptime / 86400000 );
        let hours = Math.floor(client.uptime / 3600000 ) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const botEmbed = new MessageEmbed()
        .setTitle("<:Bot:873923621247127612> About Me")
        .addField('Name', "Tet#2652")
        .addField(`Created `, `23-08-2021`)
        .addField('Owner', `<@814406096022011934> ||\`814406096022011934\`||`)
        .addField("Total Server", `${client.guilds.cache.size} servers`)
        .addField('Uptime', `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
        .setColor('LUMINOUS_VIVID_PINK')
        .setTimestamp()

        try {
            await message.channel.send({ embeds: [botEmbed] });
            
        } catch (error) {
            
        }
    }
}