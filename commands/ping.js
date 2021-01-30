module.exports = {
    aliases: ['pong'],
    run: async (client, message, args) => {
        return message.channel.send(`Pong! ${client.ws.ping}`)
    }
}