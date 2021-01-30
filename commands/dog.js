const fetch = require('axios')
const d = require('discord.js')
module.exports = {
    aliases: [],
    run: async (client, message, args) => {
        const result = await fetch.default.get('https://dog.ceo/api/breeds/image/random')
        const embed = new d.MessageEmbed()
        .setImage(result.data.message)

        return message.channel.send(embed)
    }
}