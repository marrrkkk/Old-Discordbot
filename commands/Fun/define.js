const { Client, Message, MessageEmbed, Permissions } = require('discord.js')
const axios = require('axios')

module.exports = {
    name: 'define',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(client, message, args) => {
        const channel = message.channel;

        const botPermissionsIn = message.guild.me.permissionsIn(channel);
    
        if(!botPermissionsIn.has([
            Permissions.FLAGS.EMBED_LINKS
        ])) return;
        let query = args.join(' ')
        if(!query) return

        try {
            query = encodeURIComponent(query)
            const {
                data: {list}
            } = await axios.get(`https://api.urbandictionary.com/v0/define?term=${query}`)
    
            const [answer] = list

            if(!answer) return message.channel.send(`Couldn't find definition for "${args.join(' ')}"`)
    
            const embed = new MessageEmbed()
            .setTitle(`${answer.word}`)
            .addField('Definition', trim(`${answer.definition}`))
            .addField('Example', trim(`${answer.example}`))
            .setColor('#2f3136')
    
            await message.channel.send({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            message.channel.send('<:cross:873923620517347389> An error occured').catch(e => console.log(e))
        }
    }
}

function trim (input){
    return input.length > 1024 ? `${input.slice(0, 1020)} ... ` : input;
}