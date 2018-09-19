import React, { Component } from 'react';
import SubmitPost from './submitPost';
import ReplyList from './replyList';
import axios from 'axios';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: []
        }
        this.addReply = this.addReply.bind(this);
    }
    componentDidMount() {
        let params = new URLSearchParams();
        params.append('action', 'readReplies');
        axios.post('/api/data.php', params).then((resp) => {
            const { data } = resp;
            if (data.success === true) {
                const responseData = data.data;
                this.setState({
                    replies: responseData
                });
            } else {
                console.log('error');
            };
        });
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