const { Client, Intents, Collection, MessageEmbed, Message, DiscordAPIError, Interaction } = require('discord.js');

const db = require('quick.db')

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS, 
    Intents.FLAGS.GUILD_MESSAGES, 
    Intents.FLAGS.GUILD_MEMBERS, 
    Intents.FLAGS.GUILD_PRESENCES, 
    Intents.FLAGS.DIRECT_MESSAGES, 
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS
], allowedMentions: { parse: ['users', 'roles'], repliedUser: true} });

const { REST } = require('@discordjs/rest');

const { Routes } = require('discord-api-types/v9');

module.exports = client;

const { token } = require('./config.json');

client.commands = new Collection();

client.snipes = new Collection();

require('./handler')(client);


//slash command
const commands = [{
    name: 'confess',
    description: 'Send a confession',
    options: [
        {
            name: 'text',
            description: 'Enter you confession',
            type: 3,
            required: true
        }
    ]
  }];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands('881386596870549524'),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
    if(!interaction.inGuild) return;
    if (!interaction.isCommand()) return;
  
    if (interaction.commandName === 'confess') {
        try {
          let cfsCh = db.get(`setcfs_${interaction.guild.id}`)
          if(cfsCh === null){
              return;
          }
          
            const ch = await client.channels.cache.get(cfsCh)
            await interaction.deferReply({ ephemeral: true }).catch((err) => {})

            const whatToConfess = interaction.options._hoistedOptions.find(f => f.name === 'text').value;

            await interaction.editReply({ content: `You confession has been sent to ${ch}`})
            const confession = new MessageEmbed()
            .setTitle('<:mail:879049788514005013> Confession')
            .setDescription(`${whatToConfess}`)
            .setFooter(`To confess type /confession <message>`)
            .setColor('LUMINOUS_VIVID_PINK')


            await ch.send({ embeds: [confession] })
            
        } catch (error) {
            
        }
    }
  });

client.login(token)