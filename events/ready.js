const client = require("../index");

client.once('ready', async () => {
    console.log(`${client.user.tag} is online`)
    client.user.setStatus('online')
    client.user.setPresence({activities: [{name: ',help'}]})

    client.guilds.cache.forEach(async (guild) => {
        if(guild.available){
            await guild.members.fetch().then((member) => {
                console.log(`Cached ${member.size} Users`)
            })
        }
    })
})
