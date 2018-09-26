import React, { Component } from 'react';
import ThreadList from './threadList';
import axios from 'axios';

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
    }
    render() {
        return (
            <div className="threadHeader">
                <h1 className="container text-center titleText">React Textboard</h1>
                <h3 className="text-center">Board Name!</h3>
                <ThreadList threads={this.state.threads} />
                <div className="text-center">
                    <button className="refreshThreadBtn btn m-2" onClick={this.fetchThreadsFromBoard}>Refresh</button>
                </div>
            </div>
        )
    }
}

export default Board;