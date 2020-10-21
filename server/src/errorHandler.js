const notFound = ((req, res, next) => {
    res.status(404);

    //passing to the next middleware - this time error handler
    next(new Error(`Not found - ${ req.originalUrl }`));
});

const errors = ((error, req, res, next) => {
    //check if the error is comming from (un)known route, set status code accordingly
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
        message: error.message,
        stack: process.env.PRODUCTION === "dev" ? error.stack : '🐱‍👤'
    });
});

module.exports = {
    notFound,
    errors
};