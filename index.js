const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
    partials: ['MESSAGE', 'CHANNEL', 'USER'],
    allowedMentions: { parse: ['users', 'roles']}
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.snipes = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(client.config.token);
