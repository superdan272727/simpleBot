const mongoose = require('mongoose')

const guildConfig = new mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    moderatorRole: {
        type: String,
        required: false
    },
    prefix: {
        type: String,
        required: true,
        default: '$'
    }

})

module.exports = mongoose.model(`GuildConfig`, guildConfig)