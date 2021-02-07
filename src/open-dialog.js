// open-dialog.js - Edit dialog implementation.

import React from 'react';

import { Dialog } from '@marcoparrone/dialog';

export default class OpenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.updateState = this.updateState.bind(this);
  }

  updateState(title, content) {
    this.setState({
      title: title,
      content: content
    });
  }

  render() {
    return (
      <Dialog id="opennote" title={this.state.title} text_close_button={this.props.text['text_close_button']} >
        <pre>{this.state.content}</pre>
      </Dialog>
    );
  }
};
