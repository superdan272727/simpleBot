const fetch = require('axios')
const d = require('discord.js')
module.exports = {
    aliases: ['minecraftserverinfo'],
    run: async (client, message, args) => {
        const server = args[0]
        const embed = new d.MessageEmbed()
        .setTitle(`Fetching..`)
        .setColor(`BLUE`)
        message.channel.send(embed)
        const result = await fetch.default.get(`https://api.bluefoxhost.com/v1/minecraft/server/${server}`)
       if(result.status === 404) {
        const errembed = new d.MessageEmbed()
        .setTitle(`Not Found`)
        .setColor(`RED`)
        .setDescription(`That server was not found!`)
        message.channel.send(errembed)
       } else {
        const re = new d.MessageEmbed()
        .setTitle(`${result.data.host}`)
        .setColor(`GREEN`)
        .addField(`PORT:`, result.data.port)
        .addField(`Online Players:`, result.data.players.online)
        message.channel.send(re)
       }
    }
}