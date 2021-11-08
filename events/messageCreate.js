const client = require('../index')
const db = require('quick.db')
const moment = require('moment')
const { Permissions, MessageEmbed } = require('discord.js')
const { defaultPrefix } = require('../config.json')

client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type === "DM") return;

    let prefix;
    let prefixes = await db.fetch(`prefix_${message.guild.id}`)
    if(prefixes === null){
        prefix = "+"
    } else {
        prefix = prefixes
    }

    if(message.content === `<@!${client.user.id}> prefix`){
        message.channel.send(`My prefix for this server is **${prefix}**`)
    }

    if(db.has(`afk-${message.author.id}+${message.guild.id}`)){
        const reason = db.get(`afk-${message.author.id}+${message.guild.id}`)
        const time = db.get(`time-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`I removed your afk (${reason}) ${moment(time).fromNow()}`)
        .then(msg => setTimeout(() => msg.delete(), 5000))
        .catch(e => console.log(e))
    }
    if(message.mentions.members.first()){
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)){
            const reason = db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
            const time = db.get(`time-${message.mentions.members.first().id}+${message.guild.id}`)
            message.channel.send(message.mentions.members.first().displayName + " is AFK - " + `${reason} (${moment(time).fromNow()})`)
            .catch(er => console.log(er))
        }
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
})

client.on('messageCreate', async message => {
    if(message.author.bot) return
    if(message.channel.type === 'DM'){
        if(!message.content.startsWith(defaultPrefix)){
            return message.channel.send(`${message.author}, my prefix in DM is \`,\`, Try doing \`,help\``)
        }

        if(message.content.startsWith(defaultPrefix + 'help')){
            const embed = new MessageEmbed()
            .setTitle('How to confess')
            .setDescription('\`,confess [serverID] <message>\`\nTo send a confession you need to get your server ID.')
            .addField('How to get you ServerID', '1. Go to settings -> Advanced, then enable "Developer Mode"\n\n2. Go to your server and and right click on the server icon then "Copy ID"')
            .setImage('https://cdn.discordapp.com/attachments/882474976136007740/895608794699141130/developer_mode.PNG')
            .setColor('LUMINOUS_VIVID_PINK')

            return await message.channel.send({ embeds: [embed] })
        }

        const args = message.content.slice(defaultPrefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase()

        if(command === 'confess'){
            try {
                const help = new MessageEmbed()
                .setTitle('How to confess')
                .setDescription(',confess <serverID> [message]')
                .setColor('#2f3136')

                if(!args[0]) return message.channel.send({ embeds: [help] })
                const guild = client.guilds.cache.get(args[0])
                if(!guild) return message.channel.send('<:cross:873923620517347389> Invalid Server ID')

                const fail = new MessageEmbed()
                .setTitle('<:cross:873923620517347389> Error')
                .setDescription(`Confession Channel has not been set yet.\n\nTo set one do \`,confession\` on your desired channel`)
                .setColor('RED')
    
                let ch = await db.get(`setcfs_${guild.id}`)
                if(ch === null) return message.channel.send({ embeds: [fail] })
    
                const channel = await client.channels.cache.get(ch)
    
                const confess = args.slice(1).join(" ")
                if(!confess) return message.channel.send('<:cross:873923620517347389> Please provide a message')
    
                const fail2 = new MessageEmbed()
                .setTitle('<:cross:873923620517347389> Error')
                .setDescription('Your confession is too long! Max is 2000 characters')
                .setColor('RED')
    
                if(confess.length > 2000) return message.channel.send({ embeds: [fail2] })
    
                let count = await db.add(`count_${guild.id}`, 1)
                if(count === null){
                    await db.set(`count_${guild.id}`, 1)
                }
    
                const success = new MessageEmbed()
                .setAuthor(`Confession sent`, guild.iconURL())
                .setDescription(`${message.author}, your confession has been posted to ${channel}`)
                .setColor('GREEN')
                .setFooter(`Confession ID: #${count}`)
    
                const confession = new MessageEmbed()
                .setAuthor(`Confession #${count}`, guild.iconURL())
                .setDescription(`${confess}`)
                .setImage(message.attachments.first()?.proxyURL || null)
                .setFooter(`To confess type /confess <message> or dm ",confess"`)
                .setColor('RANDOM')
    
                await message.channel.send({ embeds: [success] })
                .then(async () => await channel.send({ embeds: [confession] }))
            } catch (error) {
                console.log(error)
            }
        }
    }
})