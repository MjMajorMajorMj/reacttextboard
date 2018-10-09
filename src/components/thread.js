import React, { Component } from 'react';
import SubmitPost from './submitPost';
import ReplyList from './replyList';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReplyAlert from './replyAlert';
import '../assets/css/thread.css';;

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: [],
            replyAlertVisible: false
        }
        this.addReply = this.addReply.bind(this);
        this.fetchRepliesFromThread = this.fetchRepliesFromThread.bind(this);
        this.replyAlertDismiss = this.replyAlertDismiss.bind(this);
    };
    componentDidMount() {
        this.fetchRepliesFromThread();
    };
    replyAlertDismiss() {
        this.setState({
            replyAlertVisible: false
        });
    };
    fetchRepliesFromThread() {
        let params = new URLSearchParams();
        params.append('action', 'readReplies');
        params.append('threadID', this.props.threadID);
        axios.post('/api/data.php', params).then((resp) => {
            const { data } = resp;
            if (data.success === true) {
                const responseData = data.data;
                this.setState({
                    replies: responseData
                });
            } else {
                this.setState({
                    replyAlertVisible: true
                });
            };
        }).catch((error) => {
            this.setState({
                replyAlertVisible: true
            });
        });
    };
    addReply(reply) {
        let params = new URLSearchParams();
        const replyMsgToServer = reply.message;
        params.append('replyMsg', replyMsgToServer);
        params.append('threadID', this.props.threadID);
        params.append('action', 'insertReply');
        axios.post('/api/data.php', params).then((resp) => {
            const insertedReply = resp.data.data[0];
            this.setState({
                replies: [...this.state.replies, insertedReply]
            });
        });
    };
    render() {
        const { replyAlertVisible } = this.state;
        return (
            <div className="threadHeader">
                <div className="text-center">
                    <Link to='/'><button className="btn" onClick={this.props.refresh}>Return</button></Link>
                </div>
                <h3 className="text-center">{this.props.title}</h3>
                <ReplyList replies={this.state.replies} />
                <div className="text-center">
                    <button className="refreshThreadBtn btn m-2" onClick={this.fetchRepliesFromThread}>Refresh</button>
                </div>
                <SubmitPost add={this.addReply} />
                <ReplyAlert successColor='warning' replyAlertMsg='Connection Failed' replyAlertVisible={replyAlertVisible} replyAlertDismiss={this.replyAlertDismiss}/>
            </div>
        )
    }
}

export default Thread;