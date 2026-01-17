require('dotenv').config();
const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('DB Connected Successfully');
    } catch (error) {
            console.log(error.message);
    }
}

module.exports = {ConnectDB};