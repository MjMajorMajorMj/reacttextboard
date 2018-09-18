import React, { Component } from 'react';
import './submitPost.css';
import Field from './fieldReply';

class SubmitPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                replyMsg: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };
    handleInputChange(event) {
        const { value, name } = event.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({
            form: {...form}
        });
    };
    handleSubmit(event) {
        event.preventDefault();
        this.props.add(this.state.form);
    }
    render() {
        const { replyMsg } = this.state.form;
        return (
            <form className="submitPostForm text-center" onSubmit={this.handleSubmit}>
                <Field name="replyMsg" label="Reply" type="text" value={replyMsg} onChange={this.handleInputChange}/>
                <button className="submitPostBtn btn">Submit</button>
            </form>
        )
    };
};

export default SubmitPost;