import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Field from './fieldReply';
import ReplyAlert from './replyAlert';
import '../assets/css/submitPost.css';

class SubmitPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                message: ''
            },
            captchaSet: false,
            replyAlertVisible: false,
            successColor: '',
            replyAlertMsg: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this);
        this.setCaptcha = this.setCaptcha.bind(this);
        this.replyAlertDismiss = this.replyAlertDismiss.bind(this);
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
            this.setState({
                replyAlertVisible: true,
                successColor: 'warning',
                replyAlertMsg: 'Please complete the ReCAPTCHA.'
            });
        } else {
            this.setState({
                replyAlertVisible: true,
                successColor: 'success',
                replyAlertMsg: 'Post successful!'
            });
            this.props.add(this.state.form);
            this.reset();
        }
    };
    reset() {
        this.setState({
            form: {
                message: ''
            },
            captchaSet: false
        });
        window.grecaptcha.reset();
    };
    setCaptcha() {
        this.setState({
            captchaSet: true
        });
    };
    replyAlertDismiss() {
        this.setState({
            replyAlertVisible: false
        });
    };
    render() {
        const { successColor, replyAlertMsg, replyAlertVisible } = this.state;
        const { message } = this.state.form;
        return (
            <form className="submitPostForm text-center" onSubmit={this.handleSubmit}>
                <Field name="message" label="Reply" type="text" value={message} onChange={this.handleInputChange} />
                <div className="captchaDiv">
                    <ReCAPTCHA
                        sitekey="6Lfr4HEUAAAAAD9uGSjg7_LtC2cjZ2ZkK9nU_h49"
                        onChange={this.setCaptcha}
                    />
                </div>
                <div className="text-center">
                    <button className="submitPostBtn btn btn-primary m-2">Submit</button>
                </div>
                <ReplyAlert successColor={successColor} replyAlertMsg={replyAlertMsg} replyAlertVisible={replyAlertVisible} replyAlertDismiss={this.replyAlertDismiss}/>
            </form>
        )
    };
};

export default SubmitPost;