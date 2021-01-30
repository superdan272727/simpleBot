const fetch = require('axios')
const d = require('discord.js')
module.exports = {
    aliases: [],
    run: async (client, message, args) => {
        const result = await fetch.default.get('https://meme-api.herokuapp.com/gimme')
        const embed = new d.MessageEmbed()
        .setImage(result.data.url)

        return message.channel.send(embed)
    }
}