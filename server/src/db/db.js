/* == DB connection == */
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI || 'localhost';
const dbURI_PORT = process.env.DB_URI_PORT || '27020';
const dbName = process.env.DB_NAME || 'tweetbot';

const dbUsername = process.env.DB_USERNAME || '';
const dbPassword = process.env.DB_PASSWORD || '';

const uri = `mongodb://${ dbUsername }:${ dbPassword }@${ dbURI }:${ dbURI_PORT }/${ dbName }`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Or using promises
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, options);
        console.log('Succesfully connected to the DB!');

    } catch (err) {
        console.log(`An error: ${ err } has occured.`);
    }
};

module.exports = connectDB;