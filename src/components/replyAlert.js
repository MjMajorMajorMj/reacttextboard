import React, { Component } from 'react';
import { Alert } from 'reactstrap';

class ReplyAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.onDismiss = this.onDismiss.bind(this);
    };
    componentDidUpdate(prevProps) {
        if (this.props.visible !== prevProps.visible) {
            this.setState({
                visible: true
            })
        }
    };
    onDismiss() {
        this.setState({ visible: false });
    };
    render() {
        return (
            <div className="replyAlertDiv">
                <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Post successful!
                </Alert>
            </div>
        );
    }
}
export default ReplyAlert;