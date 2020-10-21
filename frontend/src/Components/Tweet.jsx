import React from 'react';

// Bootstrap 4 icons
import ThumbsUp from '../Assets/img/thumbs-up.svg';
import ThumbsDown from '../Assets/img/thumbs-down.svg';

import { formatDate } from '../utils/date';
const axios = require('axios');

const Tweet = ({ prop, propagateChange }) => {
    const updateTweet = async (toUpdate) => {
        try {
            await axios({
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
            propagateChange();
        } catch (error) {
            console.error(error);
        }
    };

    const delTweet = async (tweetID) => {
        try {
            await axios({
                method: 'DELETE',
                url: `${ process.env.REACT_APP_SERVER_URL }/wall/tweet/${ tweetID }`
            });
            propagateChange();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="tweet">
            <div className="tweetRow1">
                <div className="tweetTitle">{ prop.title }</div>
                <div className="tweetDate">{ formatDate(prop.date) }</div>
            </div>
            <div className="tweetRow2">
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
                <div className="tweetDelete" onClick={ () => delTweet(prop._id) }>Delete tweet</div>
            </div>
            <div className="tweetText">{ prop.text }</div>
        </div>
    );
};

export default Tweet;