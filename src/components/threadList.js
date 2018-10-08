import React, { Component } from 'react';
import ThreadLink from './threadLink';
import ThreadForm from './newThreadForm';

class ThreadList extends Component {
    render() {
        const thread = this.props.threads.map((item, index) => {
            return (
                <ThreadLink key={index} thread={item} />
            )
        });
        return (
            <div className="text-center">
                <div className="text-center">
                    <button className="btn">Create New Thread</button>
                    <ThreadForm />
                </div>
                <div>{thread}</div>
                <div className="text-center">
                    <button className="refreshThreadBtn btn m-2" onClick={this.props.refresh}>Refresh</button>
                </div>
            </div>
        )
    }
}

export default ThreadList;