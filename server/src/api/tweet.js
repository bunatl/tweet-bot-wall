const { Router } = require("express");
const router = Router();

router.get('/', (req, res, next) => {
    res.json({
        text: "this will return all tweets in",
        cors: "anyone"
    });
});

router.post('/tweet/add', (req, res, next) => {
    res.json({
        text: "this is confirm succesful tweet add",
        cors: "anyone"
    });
});

router.post('/tweet/delete', (req, res, next) => {
    res.json({
        text: "let delete tweet from db",
        cors: "only front front end"
    });
});

const checkTweetID = (req, res, next) => {
    if (req.params.tweetID === "1")
        next(new Error(`String- ${ req.originalUrl }`));

    next();
};

router.get('/tweet/:tweetID', checkTweetID, (req, res, next) => {
    res.json({
        text: "return single tweet",
        cors: "anyone",
        id: req.params.tweetID
    });
});

module.exports = router;