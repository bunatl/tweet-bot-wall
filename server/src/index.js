const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

/* 
    For security reasons
    Removes X-Powered-by: Express header
    Add/mask other header properties 
*/
app.use(helmet());
app.use(morgan('dev'));

// CORS policy
app.use(cors({
    //only frontend can access backend
    origin: process.env.CORS_ORIGIN,
}));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());

/* == DB connection == */
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* == Routing == */
app.get('/', (req, res) => {
    res.json({
        msg: "hello from server index.js"
    });
});

const tweets = require('./api/tweet');
app.use('/wall', tweets);

const errorHandler = require('./errorHandler');
//if no previous route corresponds
app.use(errorHandler.notFound);
// handle all erros
app.use(errorHandler.errors);

/* == Listen == */
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on port: ${ port }`);
});