require('dotenv').config()
const discord = require('discord.js')
const client = new discord.Client()
const fs = require('fs')
const guildConfig = require('./db/schemas/GuildConfig')
client.guildCommandPrefixes = new Map()
client.moderatorRoles = new Map()
client.commands = new Map()
client.on('ready', async () => {
    console.log(`Bot Online`)
    require('./db/connect')()
// [trying on my alt please wait]
    client.guilds.cache.forEach(async guild => {
        let g;
        const ge = await guildConfig.findOne({ guildId: guild.id })
        if(ge) {
            g = ge
        } else {
            const newGuild = await guildConfig.create({ guildId: guild.id })
            g = newGuild
        }

        console.log(g)
        client.guildCommandPrefixes.set(guild.id, g.prefix);
        client.moderatorRoles.set(guild.id, g.moderatorRole)
    })
})
fs.readdir(`./commands/`, (err, files) => {
    if(err) console.log(err)

    files.forEach(file => {
        const name = file.split('.')[0]
        const props = require(`./commands/${name}.js`)

        client.commands.set(name, props)
    })
})
client.on('message', async (message) => {
    if(message.author.bot) return
    if(!message.content.startsWith(client.guildCommandPrefixes.get(message.guild.id))) return;
    const args = message.content.slice(client.guildCommandPrefixes.get(message.guild.id).length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    fs.readdir(`./commands/`, (err, files) => {
        if(err) console.log(err)

        files.forEach(file => {
            const props = require(`./commands/${file}`)
            if(props.aliases.includes(commandName)) {
                props.run(client, message, args)
            }
        })
    })
    try {
        const commandFile = require(`./commands/${commandName}.js`)
        if(!commandFile) return;
        
        commandFile.run(client, message, args)
    } catch (err) {

    }
})

client.on(`guildCreate`, async (guild) => {
    guildConfig.create({ guildId: guild.id }).catch(err => {
        if(err) console.log(err)
    })
})

client.on(`guildDelete`, async (guild) => {
    guildConfig.deleteOne({ guildId: guild.id }).catch(err => {
        if(err) console.log(err)
    })
})

client.login(process.env.token)