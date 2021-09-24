const client = require('../index')
const db = require('quick.db')
const { Permissions } = require('discord.js')

client.on("messageCreate", async (message, guild) => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`)
    if(prefixes === null){
        prefix = ","
    } else {
        prefix = prefixes
    }

    if(message.content.startsWith(prefix)) {
        const [cmd, ...args] = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    const channel = message.channel;

    const botPermissionsIn = message.guild.me.permissionsIn(channel);

    if(!botPermissionsIn.has([
        Permissions.FLAGS.SEND_MESSAGES
    ])) return;

    if (!command) return;
    await command.run(client, message, args);
    }

    if(db.has(`afk-${message.author.id}+${message.guild.id}`)){
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`I removed your afk (${info})`).catch(e => console.log(e))
    }
    if(message.mentions.members.first()){
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)){
            message.channel.send(message.mentions.members.first().displayName + " is AFK - " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
            .catch(er => console.log(er))
        } else return
    }
})