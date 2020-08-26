const { Router } = require("express");
const router = Router();

// previously defined tweet model
const Tweet = require('./tweetModel');

router.get('/', async (req, res, next) => {
    // find all documents
    const allTweets = await Tweet.find({});

    res.json({
        text: "this will return all tweets in",
        cors: "anyone",
        tweets: allTweets
    });
});

router.post('/tweet/add', (req, res, next) => {
    const newTweet = new Tweet(req.body);
    newTweet.save(error => {
        if (error)
            next(new Error(`Tweet does not have correct format at ${ req.originalUrl }`));
        else
            res.json({
                msg: "Data are loaded into DB",
                cors: "anyone",
                data: "recieved"
            });
    });

});

router.post('/tweet/delete', (req, res, next) => {
    const payload = req.body;
    Tweet.findByIdAndDelete(payload.id);
    res.json({
        text: "let delete tweet from db",
        cors: "only front front end"
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

    res.json({
        text: "return single tweet",
        cors: "anyone",
        id: req.params.tweetID,
        tweet
    });
});

module.exports = router;