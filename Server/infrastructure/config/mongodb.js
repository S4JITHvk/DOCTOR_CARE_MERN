const mongoose = require('mongoose');
const connect = () => {
    mongoose.connect(process.env.DB_URI).then(() => console.log('Connected to db')).catch((e) => {
        console.error(e.message);
    })
}
module.exports = connect