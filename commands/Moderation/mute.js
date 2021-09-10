const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "mute",
    description: "...",

    async run (client, message, args){
        const errr = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Error')
        .setDescription("You don't have permission to use this command")
        .setFooter("Require MANAGE ROLES permission")
        .setColor("RED")
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing Permission: `MANAGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send({ embeds: [errr] }).catch(e => console.log(e))

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ")
        if(!Member) return message.reply({ content: "Please specify someone to mute", allowedMentions:{repliedUsers:false}})
        if(!reason) reason = "No reason given"

        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === "muted")

        if(!role){
            try {
                message.channel.send("Mute role not found, Creating a new one...")

                let muterole = await message.guild.roles.create({
                    name: "Muted",
                    color: "#f4424b",
                    permissions: [],
                })
                message.guild.channels.cache.forEach(async (channel, id) => {
                    await channel.permissionOverwrites.edit(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    })
                });
                message.channel.send("Muterole successfully created")
                
            } catch (error) {
                console.log(error)
                message.channel.send("Unable to create mute role");
                
            }
        };
        const muteEmbed = new MessageEmbed()
        .setDescription(`🔇${Member.displayName} has been muted`)
        .setColor("RED")

        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === "muted")
        if(Member.roles.cache.get(role2.id)) return message.reply({ content: `${Member.displayName} is already muted`})
        await Member.roles.add(role2.id)
        message.channel.send({ embeds: [muteEmbed] }).catch(e => console.log(e))

        let mutelog = db.get(`setmodlogs_${message.guild.id}`)
        if(mutelog === null){
            return;
        }
        const Membed = new MessageEmbed()
        .setAuthor(Member.user.tag, Member.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Muted`)
        .addField(`Member`, `<@${Member.user.id}>`)
        .addField(`Reason`, reason)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${Member.user.id}`)
        .setColor("LUMINOUS_VIVID_PINK")

        try {
            await client.channels.cache.get(mutelog).send({ embeds: [Membed] })          
        } catch (error) {
            console.log(error)
        }

    }
}