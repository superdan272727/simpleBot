const d = require('discord.js')
module.exports = {
    aliases: ['commands', 'cmds'],
    run: async (client, message, args) => {
        const p = client.guildCommandPrefixes.get(message.guild.id)
        const embed = new d.MessageEmbed()
        .setTitle(`Command List`)
        .setDescription(`__**Utility Commands**__\n${p}settings -- Change/View guild settings.\n\n__**Misc Commands**__\n${p}ping - Gets the bots ping.\n${p}help - Shows you this embed!\n${p}dog - Shows a dog!\n${p}meme - Shows a meme!\n${p}minecraft - Gets info about a specified server.\n\n__**Moderation**__\n${p}ban - Bans a user\n${p}kick - Kicks a user!\n${p}unban - Unbans a user\n${p}announce - Announces a message!`)
        .setColor(`BLUE`)
        return message.channel.send(embed)
    }
}