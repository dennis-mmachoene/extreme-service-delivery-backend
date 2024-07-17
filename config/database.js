const mongoose = require('mongoose');

const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connected...');
    }catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = dbConnection;