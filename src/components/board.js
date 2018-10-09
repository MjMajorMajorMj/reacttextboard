import React, { Component } from 'react';
import ThreadList from './threadList';
import Thread from './thread';
import axios from 'axios';
import { Route } from 'react-router-dom';
import ReplyAlert from './replyAlert';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
            replyAlertVisible: false
        }
        this.fetchThreadsFromBoard = this.fetchThreadsFromBoard.bind(this);
        this.replyAlertDismiss = this.replyAlertDismiss.bind(this);
    };
    componentDidMount() {
        this.fetchThreadsFromBoard();
    }
    replyAlertDismiss() {
        this.setState({
            replyAlertVisible: false
        });
    };
    fetchThreadsFromBoard() {
        let params = new URLSearchParams();
        params.append('action', 'readThreads');
        axios.post('/api/data.php', params).then((resp) => {
            const { data } = resp;
            if (data.success === true) {
                const responseData = data.data;
                this.setState({
                    threads: responseData
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
    render() {
        const { threads, replyAlertVisible } = this.state;
        const threadRoute = threads.map((item, index) => {
            const threadNameRoute = "/" + item.threadID;
            return (
                <Route
                    path={threadNameRoute}
                    render={(props) => <Thread {...props} threadID={item.threadName} refresh={this.fetchThreadsFromBoard} title={item.threadTitle}/>}
                    key={index}
                />
            )
        });
        return (
            <div className="boardDiv">
                <h3 className="text-center">General Topics</h3>
                <Route
                    exact path="/"
                    render={(props) => <ThreadList {...props} threads={this.state.threads} refresh={this.fetchThreadsFromBoard} />}
                />
                <div>{threadRoute}</div>
                <ReplyAlert successColor='warning' replyAlertMsg='Connection Failed' replyAlertVisible={replyAlertVisible} replyAlertDismiss={this.replyAlertDismiss}/>
            </div>
        )
    }
}

export default Board;