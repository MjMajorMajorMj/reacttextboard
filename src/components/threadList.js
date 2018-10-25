import React, { Component } from 'react';
import ThreadLink from './threadLink';
import ThreadForm from './newThreadForm';

class ThreadList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            threadFormVisible: false
        }
    this.showThreadForm = this.showThreadForm.bind(this);
    };
    showThreadForm() {
        const { threadFormVisible } = this.state;
        if (!threadFormVisible) {
            this.setState({
                threadFormVisible: true
            })
        } else {
            this.setState({
                threadFormVisible: false
            })
        }
    };
    render() {
        let threadFormComponent = null;
        const { threadFormVisible } = this.state;
        const thread = this.props.threads.map((item, index) => {
            return (
                <ThreadLink key={index} thread={item} />
            )
        });
        if (threadFormVisible) {
            threadFormComponent = <ThreadForm refresh={this.props.refresh}/>
        }
        return (
            <div className="text-center">
                <div className="text-center">
                    <button className="btn btn-primary" onClick={this.showThreadForm}>Create New Thread</button>
                    { threadFormComponent }
                </div>
                <div>{thread}</div>
                <div className="text-center">
                    <button className="refreshThreadBtn btn btn-primary m-2" onClick={this.props.refresh}>Refresh</button>
                </div>
            </div>
        )
    }
}

export default ThreadList;