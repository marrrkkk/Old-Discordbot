const client = require('../index')

client.on('ready', () => {
    console.log(`${client.user.tag} is online`)
    client.user.setActivity(`,help`, {type: "PLAYING"}) 
})