import React, { Component } from 'react';
import ThreadLink from './threadLink';

class ThreadList extends Component {
    render() {
        const thread = this.props.threads.map((item, index) => {
            return (
                <ThreadLink key={index} thread={item} />
            )
        });
        return (
            <div className="text-center">
                <div>{thread}</div>
                <button className="refreshThreadBtn btn m-2" onClick={this.fetchThreadsFromBoard}>Refresh</button>
            </div>
        )
    }
}

export default ThreadList;