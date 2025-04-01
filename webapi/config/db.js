const mongoose = require('mongoose');
const Database = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,});
        console.log(`connection successfully ${conn.connection.host}`);
    }
    catch (error) {
        console.log(`error in connection ${error}`);
    }
}

module.exports = Database;
