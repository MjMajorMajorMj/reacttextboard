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
            <div>{thread}</div>
        )
    }
}

export default ThreadList;