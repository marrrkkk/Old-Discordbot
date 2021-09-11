const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'help-nsfw',

    async run (client, message, args){
        if(!message.channel.nsfw){
            const er = new MessageEmbed()
            .setTitle('<:cross:873923620517347389> Error')
            .setDescription("<:channel_nsfw:873923620517322782> This command only works in a NSFW Channel")
            .setColor("RED")

            message.channel.send({ embeds: [er] }).catch(er => console.log(er))
        } else {
            const nsfw = new MessageEmbed()
            .setTitle('🔞 NSFW commands')
            .setDescription(`\`\`\`fix
            \nanal           blowjob
            \nboobs          cum
            \nfeet           hentai
            \nlewd           trap
            \nwaifu-nsfw     yuri\`\`\``)
            .setColor('LUMINOUS_VIVID_PINK')

            message.channel.send({ embeds: [nsfw] })
        }
    }
}