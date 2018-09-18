import React, { Component } from 'react';
import ReplyMsg from './replyMsg';

class ReplyList extends Component {
    render() {
        const reply = this.props.replies.map((item, index) => {
            return (
                <ReplyMsg key={index} reply={item} />
            )
        });
        return (
            <div>{reply}</div>
        )
    }
}

export default ReplyList;