const mongoose = require('mongoose')
module.exports = async () => {
    try {
        await mongoose.connect(process.env.mongo_url, {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        })
        console.log(`Connected to DB.`)
    } catch (error) {
        console.log(error)
    }
}