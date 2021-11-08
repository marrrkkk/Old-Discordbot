const { Client, Message, MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'settings',
    aliases: ['config'],

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        //anti-ghostping
        if(args[0] === 'anti-ghostping'){
            if(args[1] === 'enable'){
                await db.set(`anti-ghostping-${message.guild.id}`, true)

                const on = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Enabled')
                .setDescription("Turned on Anti-Ghostping feature")
                .setColor("GREEN")
    
                return message.channel.send({ embeds: [on] }).catch(e => console.log(e))
            } else if(args[1] === 'disable'){
                await db.delete(`anti-ghostping-${message.guild.id}`)

                const off = new MessageEmbed()
                .setTitle('<:dnd:880155848364658809> Disabled')
                .setDescription("Turned off Anti-Ghostping feature")
                .setColor('LUMINOUS_VIVID_PINK')
    
                return message.channel.send({ embeds: [off] }).catch(e => console.log(e))
            } else {
                return message.channel.send('<:cross:873923620517347389> Invalid argument! \`enable, disable\`')
            }
            //confession
        } else if(args[0] === 'confess'){
            const channel = message.mentions.channels.first()
            if(channel){
                await db.set(`setcfs_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Successful')
                .setDescription(`<:mail:879049788514005013>  Confession has been set to ${channel}`)
                .setColor('LUMINOUS_VIVID_PINK')
        
                return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            } else if(args[0] === 'disable'){
                const confess = db.get(`setcfs_${message.guild.id}`)
                if(confess === null){
                    return message.channel.send('<:cross:873923620517347389> Confession has not been set yet')
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('<:dnd:880155848364658809> Disabled')
                    .setDescription('Successfully disable Confession')
                    .setColor('RED')
                    await db.delete(`setcfs_${message.guild.id}`)
                    return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
                }
            }
            //suggestion
        } else if(args[0] === 'suggestion'){
            const channel = message.mentions.channels.first()
            if(channel){
                await db.set(`suggestion_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Successful')
                .setDescription(`<:Partner:873923621129703465> Suggestion has been set to ${channel}`)
                .setColor('GREEN')
        
                return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            } else if(args[1] === 'disable') {
                const suggestion = db.get(`suggestion_${message.guild.id}`)
                if(suggestion === null){
                    return message.channel.send('<:cross:873923620517347389> Suggestion has not been set yet')
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('<:dnd:880155848364658809> Disabled')
                    .setDescription('Successfully disabled Suggestion')
                    .setColor('RED')
                    await db.delete(`suggestion_${message.guild.id}`)
                    return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
                }
            }
            //serverlog
        } else if(args[0] === 'serverlog'){
            const channel = message.mentions.channels.first()
            if(channel){
                await db.set(`setlogs_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Successful')
                .setDescription(`<:developer:873923621482033212> Server Logging has been set to ${channel}`)
                .setColor('GREEN')
        
                return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            } else if(args[1] === 'disable'){
                const serverlog = db.get(`suggestion_${message.guild.id}`)
                if(serverlog === null){
                    return message.channel.send('<:cross:873923620517347389> Serverlog has not been set yet')
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('<:dnd:880155848364658809> Disabled')
                    .setDescription('Successfully disable Server Logging')
                    .setColor('RED')
                    await db.delete(`setlogs_${message.guild.id}`)
                    return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
                }
            }
            //messagelog
        } else if(args[0] === 'messagelog'){
            const channel = message.mentions.channels.first()

            if(channel){
                await db.set(`setmeslogs_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Successful')
                .setDescription(`<:channel:873923621037436968> Message logs has been set to ${channel}`)
                .setColor('GREEN')
        
                return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            } else if(args[1] === 'disable'){
                const messagelog = message.mentions.channels.first()
                if(messagelog === null){
                    return message.channel.send('<:cross:873923620517347389> Messagelog has not been set yet')
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('<:dnd:880155848364658809> Disabled')
                    .setDescription('Successfully disable Message Logging')
                    .setColor('RED')
        
                    await db.delete(`setmeslogs_${message.guild.id}`)
                    return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
                }
            }
        } else if(args[0] === 'memberlog'){
            const channel = message.mentions.channels.first()
            if(channel){
                await db.set(`memlogs_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Successful')
                .setDescription(`<:developer:873923621482033212> Member Logging has been set to ${channel}`)
                .setColor('GREEN')
        
                return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            } else if(args[1] === 'disable'){
                const memberlog = db.get(`memlogs_${message.guild.id}`)
                if(memberlog === null){
                    return message.channel.send('<:cross:873923620517347389> Memberlog has not been set yet')
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('<:dnd:880155848364658809> Disabled')
                    .setDescription('Successfully disable Member Logging')
                    .setColor('RED')
                    await db.delete(`memlogs_${message.guild.id}`)
                    return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
                }
            }
            //modlog
        } else if(args[0] === 'modlog'){
            const channel = message.mentions.channels.first()
            
            if(channel){
                await db.set(`setmodlogs_${message.guild.id}`, channel.id)

                const embed = new MessageEmbed()
                .setTitle('<:online:880155848284995634> Successful')
                .setDescription(`<:blurplecertifiedmoderator:879212267470749746> Mod Logging has been set to ${channel}`)
                .setColor('GREEN')
        
                return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
            } else if(args[1] === 'disable'){
                const modlog = db.get(`setmodlogs_${message.guild.id}`)
                if(modlog === null){
                    return message.channel.send('<:cross:873923620517347389> Modlog has not been set yet')
                } else {
                    const embed = new MessageEmbed()
                    .setTitle('<:dnd:880155848364658809> Disabled')
                    .setDescription('Successfully disable Mod Logging')
                    .setColor('RED')
                    await db.delete(`setmodlogs_${message.guild.id}`)
                    return message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
                }
            }
        } else if(args[0] === 'prefix'){
            const err = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("Please provide a new prefix")
            .setColor('RED')
    
            const newprefix = args[1]
            if(!newprefix) return message.channel.send({ embeds: [err] })
    
            const errr = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("Prefix is too long")
            .setColor('RED')
    
            if(newprefix.length > 5) return message.channel.send({ embeds: [errr] })
    
            const success = new MessageEmbed()
            .setTitle('<:online:880155848284995634> Success')
            .setDescription(`Prefix set to **${newprefix}**`)
            .setColor("GREEN")
    
            await db.set(`prefix_${message.guild.id}`, newprefix)
            return message.channel.send({ embeds: [success] }).catch(e => console.log(e))
        }
    }
}