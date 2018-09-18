import React from 'react';
import './app.css';
import SubmitPost from './submitPost';
import ReplyList from './replyList';

export default props => {
    return (
        <div className="threadHeader">
            <h1 className="container text-center titleText">React Textboard</h1>
            <h3 className="text-center">Thread Name!</h3>
            <ReplyList />
            <SubmitPost />
        </div>
    )
}

