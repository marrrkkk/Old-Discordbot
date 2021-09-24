const client = require("../index");

client.on('ready', () => {
    console.log(`${client.user.tag} is online`)
    client.user.setStatus('online')
    client.user.setPresence({activities: [{name: ',help'}]})
})
