import React, { Component } from 'react';
import Field from './fieldReply';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { withRouter } from "react-router-dom";
import '../assets/css/theadForm.css';

class ThreadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                threadName: '',
                threadComment: ''
            },
            captchaSet: false,
            redirect: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.createThread = this.createThread.bind(this);
        this.setCaptcha = this.setCaptcha.bind(this);
    };
    setCaptcha() {
        this.setState({
            captchaSet: true
        });
    };
    handleInputChange(event) {
        const { value, name } = event.target;
        const { form } = this.state;
        form[name] = value;
        this.setState({
            form: { ...form }
        });
    };
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.captchaSet) {
            console.log('Captcha not set.');
        } else {
            this.createThread();
            this.reset();
        }
    };
    createThread() {
        const { threadName, threadComment } = this.state.form;
        let params = new URLSearchParams();
        params.append('threadName', threadName);
        params.append('threadComment', threadComment);
        params.append('action', 'createThread');
        axios.post('/api/data.php', params).then((resp) => {
            this.props.refresh();
            const threadNumID = resp.data.threadNumID;
            const threadNumRoute = "./"+threadNumID;
            this.props.history.push(threadNumRoute);
        });
    };
    reset() {
        this.setState({
            form: {
                threadName: '',
                threadComment: ''
            },
            captchaSet: false
        });
        window.grecaptcha.reset();
    };
    render() {
        const { threadName, threadComment } = this.state.form;
        return (
            <form onSubmit={this.handleSubmit}>
                <Field name="threadName" label="Title" type="text" value={threadName} onChange={this.handleInputChange} />
                <Field name="threadComment" label="Comment" type="text" value={threadComment} onChange={this.handleInputChange} />
                <div className="captchaDiv">
                    <ReCAPTCHA
                        sitekey="6Lfr4HEUAAAAAD9uGSjg7_LtC2cjZ2ZkK9nU_h49"
                        onChange={this.setCaptcha}
                    />
                </div>
                <div className="text-center">
                    <button className='btn m-2'>Submit</button>
                </div>
            </form>
        )
    }
}

export default withRouter(ThreadForm);