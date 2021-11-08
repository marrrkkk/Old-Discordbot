const {Client, Message, MessageEmbed } = require('discord.js')
const { ownerID } = require('../../config.json')

module.exports = {
    name: 'guildinfo',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        if(message.author.id !== ownerID) return;
        const guild = client.guilds.cache.get(args[0])
        const { memberCount } = guild

        try {
            if(!guild) return message.channel('Not a valid guild ID')

            const embed = new MessageEmbed()
            .setTitle(guild.name)
            .setThumbnail(guild.iconURL())
            .addField("<:serverowner:879327553695916092> Owner", `<@${guild.ownerId}>`, true)
            .addField("Channels", `<:channel:873923621037436968> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_TEXT").size}\n<:VC:873923621100335155> ${guild.channels.cache.filter((ch) => ch.type === "GUILD_VOICE").size}`, true)
            .addField("Stats", `<:early_support:873923621318443118> ${memberCount} Members\n<:atsign:879212267315544085> ${guild.roles.cache.size} Roles\n<:s_booster:873923620731228160> ${guild.premiumSubscriptionCount || "0"} Booster`)
            .addField("Other", `<:modshield:879212267856617473> Verification: **${guild.verificationLevel}**\n<:channel_nsfw:873923620517322782> NSFW: **${guild.nsfwLevel}**`)
            .setFooter(`ID: ${guild.id} \nCreated: ${moment(guild.createdTimestamp).format("LL")}`)
            .setColor("BLUE")

            await message.channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
        }
    }
}