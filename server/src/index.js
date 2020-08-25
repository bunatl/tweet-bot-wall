const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());


app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        msg: "hello from server index.js"
    });
});

const port = 3333;

app.listen(port, () => {
    console.log(`listening on port: ${ port }`);
});