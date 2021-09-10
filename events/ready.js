const client = require('../index')

client.on('ready', () => {
    console.log(`${client.user.tag} is online`)
    client.user.setStatus('idle')
    client.user.setPresence({ activities: [ {name: '+help'} ] } )
    
})