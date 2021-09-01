const { MessageEmbed } = require("discord.js");

const urban = require('urban')

module.exports = {
    name: "urban",
    aliases: ['u'],

    async run (client, message, args){
        const err = new MessageEmbed()
        .setTitle("<:cross:873923620517347389> Error")
        .setDescription("Please provide a search query\nUsage: `,urban search <word>` or `,urban random`")
        .setColor("RED")
        if(args < 1 || !["search", "random"].includes(args[0])) return message.channel.send({ embeds: [err] })
        let search = args[1] ? urban(args.slice(1).join(" ")) : urban.random();
            try {
                search.first(res => {
                    if(!res) return message.reply({ content: "No result found", allowedMentions:{repliedUsers:false}})
                    let { word, definition } = res
                    let embed = new MessageEmbed()
                    .setTitle(`${word}`)
                    .setDescription(`${definition}`)
                    .setColor("YELLOW")
                    .setTimestamp()

                    message.channel.send({ embeds: [embed] })
                })
                
            } catch (error) {
                const errr = new MessageEmbed()
                .setTitle("<:cross:873923620517347389> Error")
                .setDescription("An error occured")
                .setColor("RED")
                message.channel.send({ embeds: [errr] })
                
            }
    }
}