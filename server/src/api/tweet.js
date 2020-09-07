const { Router } = require("express");
const router = Router();

// previously defined tweet model
const Tweet = require('./tweetModel');

router.get('/', async (req, res, next) => {
    // find all documents(records)
    const tweets = await Tweet.find({});

    res.status(200);
    res.json({
        tweets,
        msg: "All tweets has been retrieved from DB."
    });
});

const checkTweetID = (req, res, next) => {
    if (req.params.tweetID.lenght < 20)
        next(new Error(`String- ${ req.originalUrl }`));

    next();
};

router.get('/tweet/:tweetID', checkTweetID, async (req, res, next) => {
    // Find the adventure with the given `id`, or `null` if not found
    const tweet = await Tweet.findById(req.params.tweetID).exec();

    res.status(200);
    res.json({
        msg: "Tweet has been found!",
        tweet
    });
});

router.post('/tweet/add', (req, res, next) => {
    const newTweet = new Tweet(req.body);
    newTweet.save(error => {
        if (error)
            next(new Error(`Tweet does not have correct format at ${ req.originalUrl }`));

        res.status(200);
        res.json({
            msg: "Tweet has been successfully added to the DB.",
            tweet: req.body
        });
    });
});

router.post('/tweet/update', (req, res, next) => {
    // select ~ find, updated value, parameters, callback
    Tweet.findByIdAndUpdate({ _id: req.body.id }, {
        likes: req.body.likes,
        dislikes: req.body.dislikes
    }, { new: true }, (err, resDoc) => {
        if (err)
            next(new Error(`Tweet hasn't been deleted - ${ req.originalUrl }`));

        res.status(200);
        res.json({
            msg: `Tweet with _id: ${ req.body.id } has been updated.`,
            tweet: resDoc,
            cors: "only front front end"
        });
    });
});

router.delete('/tweet', (req, res, next) => {
    Tweet.findByIdAndDelete({ _id: req.body.id }, (err, resDoc) => {
        if (err)
            next(new Error(`Tweet hasn't been deleted - ${ req.originalUrl }`));

        res.status(200);
        res.json({
            msg: `Tweet with _id: ${ req.body.id } has been deleted.`,
            tweet: resDoc,
            cors: "only front front end"
        });
    });
});

module.exports = router;