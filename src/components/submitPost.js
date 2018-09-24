import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Field from './fieldReply';
import './submitPost.css';

class SubmitPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                message: ''
            },
            captchaSet: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.setCaptcha = this.setCaptcha.bind(this);
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
            console.log("Please do captcha");
        } else {
            this.props.add(this.state.form);
            this.reset();
        }
    };
    reset() {
        this.setState({
            form: {
                message: ''
            }
        });
    };
    setCaptcha() {
        this.setState({
            captchaSet: true
        });
    }
    render() {
        const { replyMsg } = this.state.form;
        return (
            <form className="submitPostForm text-center" onSubmit={this.handleSubmit}>
                <Field name="message" label="Reply" type="text" value={replyMsg} onChange={this.handleInputChange} />
                <ReCAPTCHA
                    sitekey="6Lfr4HEUAAAAAD9uGSjg7_LtC2cjZ2ZkK9nU_h49"
                    onChange={this.setCaptcha}
                />
                <button className="submitPostBtn btn m-2">Submit</button>
            </form>
        )
    };
};

export default SubmitPost;