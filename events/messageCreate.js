const client = require('../index')

const db = require('quick.db')

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

    if (!command) return;
    await command.run(client, message, args);
    }
})