import React from 'react';
import './replyMsg.css';

export default props => {
    const { message, userID, datePosted, postNum } = props.reply;
    return (
        <div className="col-12 my-1">
            <div className="card">
                <div className="card-header replyMsgCard">
                    <p>#{postNum}</p>
                    <p>{datePosted}</p>
                    <p>ID: {userID}</p>
                </div>
                <div className="card-block">
                    <h4 className="card-title">
                        <div className="card-text replyMsgCardText">
                            <p>{message}</p>
                        </div>
                    </h4>
                </div>
            </div>
        </div>
    )
}