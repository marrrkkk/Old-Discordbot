const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
    name: "serverinfo",
    description: "...",

    async run (client, message, args){
        const guild = message.guild;
        const { memberCount, owner } = guild
        const embed = new MessageEmbed()
        .setTitle(message.guild.name)
        .setThumbnail(message.guild.iconURL())
        .addField("<:serverowner:879327553695916092> Owner", `<@${guild.ownerId}>`, true)
        .addField("Channels", `<:channel:873923621037436968> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\n<:VC:873923621100335155> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}`, true)
        .addField("Stats", `<:early_support:873923621318443118> ${memberCount} Members\n<:atsign:879212267315544085> ${guild.roles.cache.size} Roles\n<:s_booster:873923620731228160> ${guild.premiumSubscriptionCount || "0"} Booster`)
        .addField("Other", `<:modshield:879212267856617473> Verification: **${guild.verificationLevel}**\n<:channel_nsfw:873923620517322782> NSFW: **${guild.nsfwLevel}**`)
        .setFooter(`ID: ${message.guild.id} \nCreated: ${moment(guild.createdTimestamp).format("LL")}`)
        .setColor("BLUE")

        try {
            await message.channel.send({ embeds: [embed] })
            
        } catch (error) {
            
        }
    }
}