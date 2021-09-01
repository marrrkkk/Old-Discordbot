const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "unban",
    description: "unban a user",

    async run (client, message, args){
        if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("<:cross:873923620517347389>  I don't have permission to ban members")
        if(!message.member.permissions.has("BAN_MEMBERS")) return;

        let reason = args.slice(1).join(" ")
        const userID = args[0]

        if(!reason) reason = "No reason given"
        if(!args[0]) return message.reply({ content: "Please specify someone to unban", allowedMentions:{repliedUsers:false}})
        if(isNaN(args[0])) return message.reply({ content: "Not a valid userID", allowedMentions:{repliedUsers:false}})

        message.guild.bans.fetch().then(async bans => {
            if(bans.size === 0) return message.channel.send("This server doesn't have banned members")
            let bUser = bans.find(b => b.user.id === userID);
            if(!userID) return message.reply({ content: "Not a previously banned member", allowedMentions:{repliedUsers:false}})
            await message.guild.members.unban(bUser.user, reason).catch(err => {
                console.log(err)
                message.channel.send("<:blob_outages:873923620752212039>  Something went wrong")
            }).then(() => {
                message.channel.send(`Unbanned <@${args[0]}>`)

                let uban = db.get(`setmodlogs_${message.guild.id}`)
                if(uban === null){
                    return;
                }
                const ubembed = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Unbanned`)
                .addField(`Member`, `<@${args[0]}>`)
                .addField(`Moderator`, message.author.tag)
                .setTimestamp()
                .setColor("GREEN")

                try {
                    client.channels.cache.get(uban).send({ embeds: [ubembed] })
                    
                } catch (error) {
                    
                }

            })
        })
    }
}