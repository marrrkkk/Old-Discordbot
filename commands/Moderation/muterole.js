const { Client, Message } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'muterole',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const muterole = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) ||
        message.guild.roles.cache.find(r => r.name === args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args[1])

        if(message.guild.me.roles.highest.position <= muterole.position){
            return message.channel.send('<:cross:873923620517347389> That role is equal or above my rank')
        }

        if(!args[0]){
            try {
                message.channel.send("Creating a mute role...")

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

                await db.set(`muterole_${message.guild.id}`, muterole.id)
                message.channel.send("Muterole successfully created")
                
            } catch (error) {
                console.log(error)
                message.channel.send("Unable to create mute role");
                
            }
        } else {
            await db.set(`muterole_${message.guild.id}`, muterole.id)
            
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.permissionOverwrites.edit(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SPEAK: false
                })
            });
            message.channel.send("Muterole successfully created")
        }
    }
}