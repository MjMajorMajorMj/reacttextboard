import React from 'react';

export default props => {
    const { replyMsg, id, date, postNum } = props.reply;
    return (
        <div className="col-12 my-1">
            <div className="card">
                <div className="card-header">
                    <p>{date}</p>
                    <p>ID: {id}</p>
                    <p>#{postNum}</p>
                </div>
                <div className="card-block">
                    <h4 className="card-title">
                        <div className="card-text">
                            <p>{replyMsg}</p>
                        </div>
                    </h4>
                </div>
            </div>
        </div>
    )
}