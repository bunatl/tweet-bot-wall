import React from 'react';
const axios = require('axios');

function Newtweet ({ propagateChange }) {
    const addNewTweet = async (e) => {
        // prevent the form to be submitted
        e.preventDefault();

        // send data to DB
        try {
            await axios({
                method: 'POST',
                url: `${ process.env.REACT_APP_SERVER_URL }/wall/tweet/add`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    title: e.target.newTweetTitle.value,
                    likes: 0,
                    dislikes: 0,
                    text: e.target.newTweetText.value
                }
            });
            propagateChange();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form id="newTweet" onSubmit={ (e) => addNewTweet(e) }>
            <input
                type="text"
                name="newTweetTitle"
                placeholder="Title"
                required></input>
            <textarea
                name="newTweetText"
                placeholder="Tweet text [maximum 256 characters]"
                maxLength="256"
                required></textarea>
            <input
                type="submit"
                value="Post a new tweet" />
        </form>
    );
}

export default Newtweet;