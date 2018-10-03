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
                <div className="text-center">
                    <button className="refreshThreadBtn btn m-2" onClick={this.props.refresh}>Refresh</button>
                </div>
            </div>
        )
    }
}

export default ThreadList;