const d = require('discord.js')
const GuildConfig = require('../db/schemas/GuildConfig')
module.exports = {
    aliases: ['module'],
    run: async (client, message, args) => {
        const prefix = await client.guildCommandPrefixes.get(message.guild.id);
        const result = await require('../modules/permissions')(client, message)
        if(result === false) return message.channel.send({ embed: { title: `<:unknown:805130483818168420> You do not have permission to run this command!`, color: 'RED'}})
        if(!args[0]) return message.channel.send({ embed: { title: `Improper usage!`, color: 'RED', description: `Please use one of the following:\n\n${prefix}settings prefix (new prefix)\n${prefix}settings modrole (new mod role)\n${prefix}settings view`}})
        if(args[0] === 'prefix') {
            const newPrefix = args[1]
            if(!newPrefix) return message.channel.send({ embed: { title: `Please provide a prefix!`, color: 'RED' }})
            if(newPrefix == client.guildCommandPrefixes.get(message.guild.id)) return message.channel.send(`That is your current prefix!`)

            GuildConfig.updateOne({ guildId: message.guild.id }, { prefix: newPrefix })
            client.guildCommandPrefixes.set(message.guild.id, newPrefix)

            return message.channel.send({ embed: {title: `I have changed your prefix to ${newPrefix}`, color: `GREEN`}})
        } else if (args[0].toLowerCase() === 'modrole') {
            const newRoleGet = await message.guild.roles.cache.get(args[1]) || message.mentions.roles.first()
            if(!newRoleGet) return message.channel.send({ embed: { title: `Please provide a moderator role to set!`, color: 'RED' }})
            const newRole = newRoleGet.id
            console.log(newRole)
            console.log(client.moderatorRoles.get(message.guild.id))
            if(newRole == client.moderatorRoles.get(message.guild.id)) return message.channel.send(`That is your current moderator role!`)
            await GuildConfig.updateOne({ guildId: message.guild.id }, { moderatorRole: newRole })
            client.moderatorRoles.set(message.guild.id, newRole)
            return message.channel.send({ embed: {title: `I have changed your mod role to:`, description: ` <@&${newRole}>`, color: `GREEN`}})
        } else if (args[0].toLowerCase() === 'view') {
            
            const guild = GuildConfig.findOne({ guildId: message.guild.id })
            let disabledCommands;
            if(guild.disabledCommands === undefined || guild.disabledCommands === [] || guild.disabledCommands === null) disabledCommands = `N/A`
            else disabledCommands = guild.disabledCommands.join(', ')
            const embed = new d.MessageEmbed()
            .setTitle(`${message.guild.name}'s settings`)
            .setColor(`BLUE`)
            .addField(`Prefix:`, prefix)
            .addField(`Moderator Role`, `<@&${client.moderatorRoles.get(message.guild.id)}>`)
            message.channel.send(embed)
        }
    }
}