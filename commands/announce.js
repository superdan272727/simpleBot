const d = require('discord.js')
module.exports = {
    aliases: ['pong'],
    run: async (client, message, args) => {
        const result = await require('../modules/permissions')(client, message)
        if(result === false) return message.channel.send({ embed: { title: `<:unknown:805130483818168420> You do not have permission to run this command!`, color: 'RED'}})

        const channel = message.mentions.channels.first()
        const msg = args.slice(1).join(' ')

        if(!channel || !msg)  return message.channel.send({ embed: { title: `Improper usage!`, color: 'RED', description: `Usage: ${client.guildCommandPrefixes.get(message.guild.id)}announce (#channel) (message)`}})
        await message.delete()
        const embed = new d.MessageEmbed()
        .setTitle(`New Announcement from ${message.author.username}`)
        .setDescription(msg)
        .setColor(`BLUE`)

        await channel.send(embed)
    }
}