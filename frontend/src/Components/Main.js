import React, { useState } from 'react';

// import components
import Tweet from '../Components/Tweet';
import NewTweet from '../Components/NewTweet';

import './tweet.css';

function Main () {
    const [ numOfTweets, setNumOfTweets ] = useState(0);
    const [ filter, setFilter ] = useState("");
    const [ showNewTweetTemplate, setShowNewTweetTemplate ] = useState(false);

    const [ tweets, setTweets ] = useState([]);
    const addNewtweet = x => {
        setTweets([ ...tweets, x ]);
        setNumOfTweets(numOfTweets + 1);
        setShowNewTweetTemplate(false);
    };

    return (
        <main>
            {/* search */ }
            <input
                id="searchInput"
                placeholder="Filter tweets by title name or text..."
                onChange={ e => setFilter(e.target.value) }
            ></input>
            {/* panel */ }
            <div id="panel">
                <div>Showing { numOfTweets } tweets</div>
                <div onClick={ () => showNewTweetTemplate ? setShowNewTweetTemplate(false) : setShowNewTweetTemplate(true) }>
                    Add a new tweet
                </div>
            </div>
            {/* Conditionally showing new tweet */ }
            { showNewTweetTemplate ? <NewTweet addPost={ addNewtweet } /> : '' }
            {/* map - container of tweets */ }
            <div id="tweetsList">
                { tweets
                    .filter(x => {
                        return (
                            x.title.toLowerCase().includes(filter.toLowerCase()) ||
                            x.text.toLowerCase().includes(filter.toLowerCase())
                        );
                    })
                    .map((item, i) => (
                        <Tweet key={ i } prop={ item } />
                    )) }
            </div>
        </main>
    );
}

export default Main;