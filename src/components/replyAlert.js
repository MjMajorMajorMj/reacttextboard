import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import './replyAlert.css';

class ReplyAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.onDismiss = this.onDismiss.bind(this);
  }
  componentDidUpdate() {
      const { visible } = this.state;
      if (!visible) {
          if (this.props.replyAlertVisible) {
              this.setState({
                  visible: true
              });
          }
      }
  }
  onDismiss() {
    this.setState({ visible: false });
    this.props.replyAlertDismiss();
  }
  render() {
      const {successColor, replyAlertMsg } = this.props;
    return (
      <Alert className="replyAlert" color={successColor} isOpen={this.state.visible} toggle={this.onDismiss}>
        {replyAlertMsg}
      </Alert>
    );
  }
}
export default ReplyAlert;
