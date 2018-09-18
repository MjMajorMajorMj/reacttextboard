import React, { Component } from 'react';
import './app.css';
import SubmitPost from './submitPost';
import ReplyList from './replyList';
import ReplyData from '../components/dummyReply';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: ReplyData
        }
        this.addReply = this.addReply.bind(this);
    }
    addReply(reply) {
        this.setState({
            replies: [reply, ...this.state.replies]
        });
    }
    render() {
        return (
            <div className="threadHeader">
                <h1 className="container text-center titleText">React Textboard</h1>
                <h3 className="text-center">Thread Name!</h3>
                <ReplyList replies={this.state.replies} />
                <SubmitPost add={this.addReply} />
            </div>
        )
    }
}

export default App;