module.exports = {
    aliases: [],
    run: async (client, message, args) => {
        const result = await require('../modules/permissions')(client, message)
        if(result === false) return message.channel.send({ embed: { title: `<:unknown:805130483818168420> You do not have permission to run this command!`, color: 'RED'}})
        const user = args[0]
        if(!user) return message.channel.send({ embed: { title: `Improper usage!`, color: 'RED', description: `Usage: ${client.guildCommandPrefixes.get(message.guild.id)}unban (user ID)`}})
        try {
           message.guild.members.unban(user).then(use => {  return message.channel.send({ embed: { title: `I have unbanned ${use.user.username} from this server!`, color: 'GREEN'}})})
          
        } catch (
        err) {
            return message.channel.send(`Something went wrong, please report this!`)
        }
    }
}