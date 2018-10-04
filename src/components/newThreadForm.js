import React, { Component } from 'react';

class ThreadForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            form: {
                threadName: '',
                threadComment: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event){
        const { value, name } = event.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({
            form: {...form}
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log('handleSubmit called, form values are:', this.state.form);
    }
    render(){
        const { threadName, threadComment } = this.state.form;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input onChange={this.handleInputChange} value={threadName} name="threadName" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label>Comment</label>
                    <input onChange={this.handleInputChange} value={threadComment} name="threadComment" type="text" className="form-control"/>
                </div>
                <button>Add Contact</button>
            </form>
        )
    }
}

export default ThreadForm;