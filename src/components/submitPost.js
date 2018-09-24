import React, { Component } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Field from './fieldReply';
import ReplyAlert from './replyAlert';
import './submitPost.css';

class SubmitPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                message: ''
            },
            captchaSet: true, //set to false to enable captcha
            alertVisible: false
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
            console.log("FUG");
        } else {
            this.setState({
                alertVisible: true
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
            alertVisible:false
            //captchaSet: false,
        });
        //window.grecaptcha.reset();
    };
    setCaptcha() {
        this.setState({
            captchaSet: true //set to false to enable captcha
        });
    }
    render() {
        const { alertVisible } = this.state;
        const { message } = this.state.form;
        console.log(alertVisible);
        return (
            <form className="submitPostForm text-center" onSubmit={this.handleSubmit}>
            <ReplyAlert visible={alertVisible}/>
                <Field name="message" label="Reply" type="text" value={message} onChange={this.handleInputChange} />
                {/* <div className="captchaDiv">
                    <ReCAPTCHA
                        sitekey="6Lfr4HEUAAAAAD9uGSjg7_LtC2cjZ2ZkK9nU_h49"
                        onChange={this.setCaptcha}
                    />
        </div> */}
                <div className="text-center">
                    <button className="submitPostBtn btn m-2">Submit</button>
                </div>
            </form>
        )
    };
};

export default SubmitPost;