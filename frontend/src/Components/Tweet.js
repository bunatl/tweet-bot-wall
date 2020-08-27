import React, { useState } from 'react';

// Bootstrap 4 icons
import ThumbsUp from '../Assets/img/thumbs-up.svg';
import ThumbsDown from '../Assets/img/thumbs-down.svg';

const axios = require('axios');

function Tweet ({ prop, propagateChange }) {
    const updateTweet = async (toUpdate) => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${ process.env.REACT_APP_SERVER_URL }/wall/tweet/update`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: prop._id,
                    likes: toUpdate === "likes" ? prop.likes + 1 : prop.likes,
                    dislikes: toUpdate === "dislikes" ? prop.dislikes + 1 : prop.dislikes
                }
            });
            console.log(response);
            propagateChange();
        } catch (error) {
            console.error(error);
        }
    };

    const delTweet = async () => {
        try {
            const response = await axios({
                method: 'POST',
                url: `${ process.env.REACT_APP_SERVER_URL }/wall/tweet/delete`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    id: prop._id
                }
            });
            console.log(response);
            propagateChange();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="tweet">
            <div className="tweetRow1">
                <div className="tweetTitle">{ prop.title }</div>
                <div className="tweetLikes">
                    <div onClick={ () => updateTweet('likes') }>
                        { prop.likes }
                        <img src={ ThumbsUp } alt="ThumbsUpCount"></img>
                    </div>
                    <div onClick={ () => updateTweet('dislikes') }>
                        { prop.dislikes }
                        <img src={ ThumbsDown } alt="ThumbsDownCount"></img>
                    </div>
                </div>
            </div>
            <div className="tweetRow2">
                <div className="tweetDate">{ prop.date }</div>
                <div className="tweetDelete" onClick={ delTweet }>Delete tweet</div>
            </div>
            <div className="tweetText">{ prop.text }</div>
        </div>
    );
}

export default Tweet;