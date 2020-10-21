import React, { useState, useEffect } from 'react';

// import components
import Tweet from './Tweet';
import NewTweet from './NewTweet';

import spinnerSvg from '../Assets/img/spinner.svg';

const axios = require('axios');

const Main = () => {
    const [ filter, setFilter ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ tweetsArray, setTweetsArray ] = useState([]);
    const [ dataChanged, setDataChanged ] = useState(false);
    const [ showNewTweetTemplate, setShowNewTweetTemplate ] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const { data: { tweets } } = await axios.get(`${ process.env.REACT_APP_SERVER_URL }/wall`);
                // display latest added as first
                setTweetsArray(tweets.reverse());
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
        // reset data change state
        setDataChanged(false);
    }, [ dataChanged ]);


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
                <div>Showing { tweetsArray.length } tweets</div>
                <div onClick={ () => showNewTweetTemplate ? setShowNewTweetTemplate(false) : setShowNewTweetTemplate(true) }>
                    Add a new tweet
                </div>
            </div>
            {/* Conditionally showing new tweet */ }
            { showNewTweetTemplate ? <NewTweet propagateChange={ () => { setDataChanged(true); setShowNewTweetTemplate(false); } } /> : '' }
            {/* map - container of tweets */ }
            <div id="tweetsList">
                { loading ? <img id="spinner" src={ spinnerSvg } alt="spinner"></img>
                    : tweetsArray
                        .filter(x => (
                            x.title.toLowerCase().includes(filter.toLowerCase()) ||
                            x.text.toLowerCase().includes(filter.toLowerCase())
                        ))
                        .map((item, i) => (
                            <Tweet key={ i } prop={ item } propagateChange={ () => setDataChanged(true) } />
                        )) }
            </div>
        </main>
    );
};

export default Main;