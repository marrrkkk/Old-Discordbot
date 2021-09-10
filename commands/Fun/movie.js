const { MessageEmbed } = require('discord.js')
const imdb = require("imdb-api");

module.exports = {
    name: "movie",
    
    async run (client, message, args, color) {
    
    if(!args.length) {
      return message.channel.send("Please give the name of movie or series")
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"}) //You need to paste you imdb api
    
    let movie = await imob.get({'name': args.join(" ")})
    
    let embed = new MessageEmbed()
    .setTitle(movie.title)
    .setColor("ORANGE")
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Ratings: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true);
    
    
    message.channel.send({ embeds: [embed] }).catch(e => console.log(e))
    
    
    
  }

}