import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/threadLink.css';

export default props => {
    const { threadTitle, dateUpdated, numOfPosts } = props.thread;
    return (
        <div className="col-12 my-1">
            <div className="card">
                <div className="card-header threadCard">
                    <p>Last Updated: {dateUpdated}</p>
                    <p>Replies: {numOfPosts-1}</p>
                </div>
                <div className="card-block">
                    <h4 className="card-title">
                        <div className="card-text threadCardText">
                            <Link to="/test">{threadTitle}</Link>
                        </div>
                    </h4>
                </div>
            </div>
        </div>
    )
}