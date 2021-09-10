const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

const ms = require('ms')

module.exports = {
    name: "tempmute",
    aliases: ['tmute'],

    async run (client, message, args){
        if(!message.guild.me.permissions.has("MANAGE_ROLES")) return message.reply({ content: "Missing Permission: `MANGE_ROLES`", allowedMentions:{repliedUsers:false}})
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.reply({ content: "You don't have permission to mute members", allowedMentions:{repliedUsers:false}})

        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const time = args[1]
        if(!Member) return message.reply({ content: "Please specify someone to mute", allowedMentions:{repliedUsers:false}})
        if(!time) return message.reply({ content: "Please specify the duration for the timedmute", allowedMentions:{repliedUsers:false}})
        if(!time.endsWith("s") && !time.endsWith("m") && !time.endsWith("h") && !time.endsWith("d")){
            return message.reply({ content: "Please use a valid time format e.g. `m` for minutes or `h` for hours", allowedMentions:{repliedUsers:false}})
        }

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
                        SEND_MESSAGE: false,
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
        .setDescription(`🔇${Member.displayName} has been muted for ${time}`)
        .setColor("RED")

        const unmteEmbed = new MessageEmbed()
        .setDescription(`<:check:873923620282437654> ${Member.displayName} has been unmuted`)
        .setColor("GREEN")

        let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === "muted")
        if(Member.roles.cache.get(role2.id)) return message.reply({ content: `${Member.displayName} is already muted`})
        await Member.roles.add(role2.id)
        message.channel.send({ embeds: [muteEmbed] }).catch(e => console.log(e))

        let mute2 = db.get(`setmodlogs_${message.guild.id}`)
        if(mute2 === null){
            return;
        }
        const Membed2 = new MessageEmbed()
        .setAuthor(Member.user.tag, Member.user.displayAvatarURL())
        .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Muted`)
        .addField(`Member`, `<@${Member.user.id}>`)
        .addField(`Duration`, time)
        .addField(`Moderator`, message.author.tag)
        .setTimestamp()
        .setFooter(`User ID: ${Member.user.id}`)
        .setColor("LUMINOUS_VIVID_PINK")

        try {
            await client.channels.cache.get(mute2).send({ embeds: [Membed2] })
        } catch (error) {
            console.log(error)
        }

        setTimeout(async () => {
            await Member.roles.remove(role2)
            message.channel.send({ embeds: [unmteEmbed] })
            let um = db.get(`setmodlogs_${message.guild.id}`)
            
            if(um === null){
                return;
            }
            const Uembed2 = new MessageEmbed()
            .setAuthor(Member.user.tag, Member.user.displayAvatarURL())
            .setTitle(`<:blurplecertifiedmoderator:879212267470749746> Member Unmuted`)
            .addField(`Member`, `<@${Member.user.id}>`)
            .addField(`Reason`, `Automatic unmute`)
            .setTimestamp()
            .setFooter(`User ID: ${Member.user.id}`)
            .setColor("GREEN")
    
            try {
                await client.channels.cache.get(um).send({ embeds: [Uembed2] })
            } catch (error) {
                console.log(error)
            }


        }, ms(time))
    }
}