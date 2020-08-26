// mongoose.Schema
const { Schema } = require('mongoose');

const requiredString = {
    // String is shorthand for {type: String}
    String,
    required: true
};
const requiredNumber = {
    type: Number,
    required: true
};

const requiredDate = {
    type: Date,
    required: true
};

const Company = mongoose.model('Company',
    new Schema({
        title: requiredString,
        likes: requiredNumber,
        dislikes: requiredNumber,
        date: requiredDate,
        text: requiredString
    })
);

module.exports = Company;