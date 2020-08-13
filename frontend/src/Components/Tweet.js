import React, { useState } from 'react';

// Bootstrap 4 icons
import ThumbsUp from '../Assets/img/thumbs-up.svg';
import ThumbsDown from '../Assets/img/thumbs-down.svg';

function Tweet ({ prop }) {
    const [ likes, setLikes ] = useState(0);
    const [ dislikes, setDislikes ] = useState(0);

    return (
        <div className="tweet">
            <div className="tweetRow1">
                <div className="tweetTitle">{ prop.title }</div>
                <div className="tweetLikes">
                    <div onClick={ () => setLikes(likes + 1) }>
                        { likes }
                        <img src={ ThumbsUp } alt="ThumbsUpCount"></img>
                    </div>
                    <div onClick={ () => setDislikes(dislikes + 1) }>
                        { dislikes }
                        <img src={ ThumbsDown } alt="ThumbsDownCount"></img>
                    </div>
                </div>
            </div>
            <div className="tweetRow2">
                <div className="tweetDate">{ prop.date }</div>
                <div className="tweetDelete">Delete tweet</div>
            </div>
            <div className="tweetText">{ prop.text }</div>
        </div>
    );
}

export default Tweet;