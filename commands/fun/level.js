const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "level",
    aliases: ['lvl'],

    async run (client, message, args){
        xxp(message)
        if(message.author.bot) return;
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        let level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0
        let xp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0
        let xpNeeded = level * 500 + 500

        const lvl = new MessageEmbed()
        .setTitle(`${user.displayName}'s Level`)
        .addField("XP", `${xp}/${xpNeeded}`, true)
        .addField("Level", `${level}`, true)
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
        .setColor('LUMINOUS_VIVID_PINK')

        try {
            message.channel.send({ embeds: [lvl] })
            
        } catch (error) {
            
        }

        function xxp(message){
            if(message.author.bot) return
            const random = Math.floor(Math.random() * 50) + 100
            db.add(`guild_${message.guild.id}_xp_${message.author.id}`, random)
            db.add(`guild_${message.guild.id}_totalxp_${message.author.id}`, random)
            let level = db.get(`guild_${message.guild.id}_level_${message.author.id}` || 1)
            let xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
            let xpNeeded = level * 500
            if(xpNeeded < xp){
                let newlvl = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1)
                db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            }
        }
    }
}