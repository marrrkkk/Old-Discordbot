const { MessageEmbed } = require('discord.js');
const client = require('../index')

client.on('interactionCreate', async interaction => {
    if(!interaction.isButton()) return;

    if(interaction.customId === 'setup'){
        const log = new MessageEmbed()
        .setTitle("<:rules:880108679184130090> Setup")
        .setDescription('To disable each log, just add `disable` at the end of the command\nex. `,setlog disable`')
        .addField("anti-ghostping on/off", "toggle wether to use anti-ghostping or not")
        .addField("set-prefix", "change my prefix, default is `,`")
        .addField("set-log", "set the server log\n`e.g. channel updates, join, leave members etc..`")
        .addField("set-modlog", "set the moderation log\n`e.g. ban, kick, mute`")
        .addField("set-meslog", "set the message log\n`e.g. deleted message(including image), edited message`")
        .addField("set-confession", "set the confession channel")
        .setColor("BLURPLE")
        .setTimestamp()

        interaction.reply({ embeds: [log], ephemeral: true })
    }

    if(interaction.customId === 'mod'){
        const mod = new MessageEmbed()
        .setTitle("<:blurplecertifiedmoderator:879212267470749746> Moderation")
        .setDescription("**Note: **If the bot didn't find any mute role in your server, it wil automatically create a new one and overwrites all the channels from the server.")
        .addField("ban", "Permanently ban a member\nUsage: `ban [member] <reason>`")
        .addField("unban", "Unaban a member using ID\nUsage: `unban [userID] <reason>`")
        .addField("kick", "Kick a member\nUsage: `kick [member] <reason>`")
        .addField("mute", "Permanently mute a member\nUsage: `mute [member] <reason>`")
        .addField("tempmute", "Temporarily mute a member\ns for seconds, m for minutes, h for hours...\nUsage: `tempmute [member] <time> <reason>`")
        .addField("unmute", "Unmute a muted member\nUsage: `unmute [member]`")
        .addField("warn", "`warn` - give warning to members\n`warns` - show member warnings\n`rwarn` - remove all warns from the member")
        .setColor("BLURPLE")
        .setFooter("All reasons are optional(you can choose to ignore them)")
        .setTimestamp()

        interaction.reply({ embeds: [mod], ephemeral: true })
    }

    if(interaction.customId === 'util'){
        const util = new MessageEmbed()
        .setTitle("<:developer:873923621482033212> Utility")
        .addField("Commands", "`afk` - away from the keyboard\n`avatar` - shows user avatar\n`userinfo` - shows user infomation\n`ping` - show bot latency\n`arole` - add role to a member\n`rrole` - remove role from a member\n`roleinfo` - shows role information\n`purge` - delete an amount of messages\n`NSFW` - toggle nsfw in channels settings\n`lock/unlock` - lock or unlock a channel\n`serverinfo` - shows guild information\n`botinfo` - shows information about me\n`announce` - make an announcement\nUsage: `,announce [message] <#channel>")
        .setColor("BLURPLE")
        .setTimestamp()

        interaction.reply({ embeds: [util], ephemeral: true })
    }

    if(interaction.customId === 'fun'){
        const fun = new MessageEmbed()
        .setTitle("<:blurpleannouncements:879212267588182086> Entertainment")
        .addField("Commands", "`level` - shows your current level in the guild\n`snipe` - snipes recently deleted message(including images)\n`meme` - gives random meme\n`ask` - ask the bot\n`cfs` - you must first setup a confession channel to use this, and to set a channel type `set-confession`\n`dog` - gives random photo of a dog\n`echo` - repeat your message in specific channel\n`waifu` - gives random images of waifu's\n`waifu-nsfw` - waifu pics but...\n`urban search` - search a word from urban\n`urban random` - find random word from urban")
        .setColor("BLURPLE")
        .setTimestamp()

        interaction.reply({ embeds: [fun], ephemeral: true })
    }
})