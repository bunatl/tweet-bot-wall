const { Router } = require("express");
const router = Router();
const mongoose = require('mongoose');

// previously defined tweet model
const Tweet = require('../db/model/tweetModel');

router.get('/', async (req, res, next) => {
    try {
        // find all documents(records)
        const tweets = await Tweet.find({});
        mongoose.connection.close();

        res.status(200);
        res.json({
            tweets,
            msg: "All tweets has been retrieved from DB."
        });
    } catch (err) {
        next(new Error(`No tweets have been found in DB.`));
    }
});

const checkTweetID = (req, res, next) => next(req.params.tweetID.lenght < 20 ? new Error(`String- ${ req.originalUrl }`) : '');
router.get('/tweet/:tweetID', checkTweetID, async (req, res, next) => {
    try {
        // Find the adventure with the given `id`, or `null` if not found
        const tweet = await Tweet.findById(req.params.tweetID).exec();

        res.status(200);
        res.json({
            msg: "Tweet has been found!",
            tweet
        });
    } catch (err) {
        next(new Error(`Tweet with ${ req.params.tweetID } has not been found.`));
    }
});

router.post('/tweet/add', async (req, res, next) => {
    const newTweet = new Tweet(req.body);
    try {
        await newTweet.save();
        res.status(200);
        res.json({
            msg: "Tweet has been successfully added to the DB.",
            tweet: req.body
        });
        mongoose.connection.close();
    } catch (err) {
        next(new Error(`Tweet does not have correct format at ${ req.originalUrl }`));
    }
});

router.post('/tweet/update', async (req, res, next) => {
    // select ~ find, updated value, parameters, callback
    try {
        const resDoc = await Tweet.findByIdAndUpdate(
            { _id: req.body.id },
            {
                likes: req.body.likes,
                dislikes: req.body.dislikes
            },
            { new: true }
        );

        res.status(200);
        res.json({
            msg: `Tweet with _id: ${ req.body.id } has been updated.`,
            tweet: resDoc,
            cors: "only front front end"
        });
    } catch (err) {
        next(new Error(`Tweet hasn't been deleted - ${ req.originalUrl }`));
    }
});

router.delete('/tweet/:id', async (req, res, next) => {
    try {
        const resDoc = await Tweet.findByIdAndDelete({ _id: req.params.id });

        res.status(200);
        res.json({
            msg: `Tweet with _id: ${ req.params.id } has been deleted.`,
            tweet: resDoc,
            cors: "only front front end"
        });
    } catch (err) {
        next(new Error(`Tweet hasn't been deleted - ${ req.originalUrl }`));
    }
});

module.exports = router;