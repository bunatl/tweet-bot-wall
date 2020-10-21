const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requiredString = {
    // String is shorthand for {type: String}
    type: String,
    required: true
};
const requiredNumber = {
    type: Number,
    required: true
};

const dateFormat = {
    type: Date,
    default: Date.now()
};

// mongoose.model(modelName ~ collection, schema)
const TweetModel = mongoose.model('tweets',
    new Schema({
        title: requiredString,
        likes: requiredNumber,
        dislikes: requiredNumber,
        date: dateFormat,
        text: requiredString
    })
);

module.exports = TweetModel;