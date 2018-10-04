import React, { Component } from 'react';
import ThreadList from './threadList';
import Thread from './thread';
import axios from 'axios';
import ThreadForm from './newThreadForm';
import { Route } from 'react-router-dom';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            threads: [],
        }
        this.fetchThreadsFromBoard = this.fetchThreadsFromBoard.bind(this);
    };
    componentDidMount() {
        this.fetchThreadsFromBoard();
    }
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
                console.log('error');
            };
        });
    };
    render() {
        const { threads } = this.state;
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
                <h3 className="text-center">Board Name!</h3>
                <div className="text-center">
                    <button className="btn">Create New Thread</button>
                    <ThreadForm />
                </div>
                <Route
                    exact path="/"
                    render={(props) => <ThreadList {...props} threads={this.state.threads} refresh={this.fetchThreadsFromBoard} />}
                />
                <div>{threadRoute}</div>
            </div>
        )
    }
}

export default Board;