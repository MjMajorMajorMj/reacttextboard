import React, { Component } from 'react';
import DummyReply from './dummyReply';
import ReplyMsg from './replyMsg';

class ReplyList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: DummyReply
        }
    }
    render() {
        const reply = this.state.replies.map((item, index) => {
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