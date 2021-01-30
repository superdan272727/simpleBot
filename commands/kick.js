module.exports = {
    aliases: [],
    run: async (client, message, args) => {
        const result = await require('../modules/permissions')(client, message)
        if(result === false) return message.channel.send({ embed: { title: `<:unknown:805130483818168420> You do not have permission to run this command!`, color: 'RED'}})
        const user = message.mentions.members.first() || await message.guild.members.fetch(args[0])
        if(!user) return message.channel.send({ embed: { title: `Improper usage!`, color: 'RED', description: `Usage: ${client.guildCommandPrefixes.get(message.guild.id)}kick (user) (reason)`}})
        const userId = user.id
        const reason = args.slice(1).join(' ')
        const username = user.username
        try {
           user.kick({ reason: reason }).then(use => {  return message.channel.send({ embed: { title: `I have kicked ${use.user.username} from this server!`, color: 'GREEN'}})})
          
        } catch (
        err) {
            return message.channel.send(`Something went wrong, please report this!`)
        }
    }
}