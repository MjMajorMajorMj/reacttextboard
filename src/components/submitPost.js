import React, { Component } from 'react';
import './submitPost.css';

class SubmitPost extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form className="submitPostForm text-center">
                <div className="form-group">
                    <label className="replyLabel">Reply</label>
                    <input name="replyPost" type="text" className="form-control"/>
                </div>
                <button className="submitPostBtn btn">Submit</button>
            </form>
        )
    };
};

export default SubmitPost;