import React, { Component } from 'react';
import SubmitPost from './submitPost';
import ReplyList from './replyList';
import ReplyData from '../components/dummyReply';
import axios from 'axios';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: ReplyData
        }
        this.addReply = this.addReply.bind(this);
    }
    addReply(reply) {
        let params = new URLSearchParams();
        const replyMsgToServer = reply.replyMsg;
        params.append('replyMsg', replyMsgToServer);
        params.append('action', 'insertReply');
        axios.post('/api/data.php', params).then((resp) => {
            console.log('Server response:', resp);
        });
        this.setState({
            replies: [...this.state.replies, reply]
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