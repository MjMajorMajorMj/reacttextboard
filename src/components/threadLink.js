import React from 'react';

export default props => {
    const { threadTitle, dateUpdated } = props.thread;
    return (
        <div className="col-12 my-1">
            <div className="card">
                <div className="card-header replyMsgCard">
                    <p>{dateUpdated}</p>
                </div>
                <div className="card-block">
                    <h4 className="card-title">
                        <div className="card-text replyMsgCardText">
                            <p>{threadTitle}</p>
                        </div>
                    </h4>
                </div>
            </div>
        </div>
    )
}