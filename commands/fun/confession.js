const { MessageEmbed } = require("discord.js");

const db = require('quick.db');

module.exports = {
    name: 'confession',
    aliases: ['cfs'],

    async run (client, message, args){
        const member = message.member;
        const guild = message.guild;
        const err = new MessageEmbed()
        .setTitle('<:cross:873923620517347389> Wrong Usage')
        .setDescription('To confess type `,cfs <message>`')
        .setFooter('Make sure to setup the confession first')
        .setColor('LUMINOUS_VIVID_PINK')

        let cfsCh = db.get(`setcfs_${message.guild.id}`)
        if(cfsCh === null){
            return;
        }

        let msg = args[0]
        if(!args[0]){
            message.delete()
            return member.send({ embeds: [err] });
        }
        const confession = new MessageEmbed()
        .setTitle('<:mail:879049788514005013> Confession')
        .setDescription(`${msg}`)
        .setFooter(`To confess type ,cfs <message>`, guild.iconURL())
        .setColor('LUMINOUS_VIVID_PINK')

        message.delete()

        try {
            await client.channels.cache.get(cfsCh).send({ embeds: [confession] })
            
        } catch (error) {
            
        }
    }
}