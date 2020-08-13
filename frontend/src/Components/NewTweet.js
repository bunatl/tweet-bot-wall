import React from 'react';

function Newtweet ({ addPost }) {
    const addNewTweet = (e) => {

        // prevent the form to be submitted
        e.preventDefault();

        addPost({
            title: e.target.newTweetTitle.value,
            text: e.target.newTweetText.value,
            date: new Date().toDateString()
        });

        // send data to DB
    };

    return (
        <form id="newTweet" onSubmit={ addNewTweet }>
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