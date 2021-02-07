// edit-dialog.js - Edit dialog implementation.

import React from 'react';

import { Dialog } from '@marcoparrone/dialog';

export default class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: '',
      type: 'note',
      title: '',
      content: ''
    };
    this.updateState = this.updateState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  updateState(cursor, type, title, content) {
    this.setState({
      cursor: cursor,
      type: type,
      title: title,
      content: content
    });
  }

  handleInputChange(e) {
    switch (e.target.name) {
      case 'type':
        if (e.target.checked === true) {
          this.setState({ type: e.target.value });
        }
        break;
      case 'title':
        this.setState({ title: e.target.value });
        break;
      case 'content':
        this.setState({ content: e.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Dialog id="editnote" title={this.props.text['text_edit_title']}
        actions={(<span><input type="submit" value={this.props.text['text_delete'] || "Delete"} onClick={event => this.props.deleteNote(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
          <input type="submit" value={this.props.text['text_back'] || "Back"} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
          <input type="submit" value={this.props.text['text_save'] || "Save"} onClick={event => this.props.handleSubmit(this.state.cursor, this.state.type, this.state.title, this.state.content)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></span>)}>
        <label>{this.props.text['text_edit_type']}
          <input type="radio" id="abktypenote" name="type" value="note" checked={this.state.type === 'note'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_edit_note']}
          <input type="radio" id="abktypefolder" name="type" value="folder" checked={this.state.type === 'folder'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_edit_folder']}
        </label><br />
        <label>{this.props.text['text_edit_note_title']}
          <input type="text" id="abktitle" name="title" value={this.state.title} onChange={this.handleInputChange}></input>
        </label><br />
        {this.state.type === 'note' &&
          <label>{this.props.text['text_edit_content']}<br />
            <textarea type="text"
              id="abkcontent"
              name="content"
              value={this.state.content}
              rows={this.props.textarearows}
              cols={this.props.textareacols}
              onChange={this.handleInputChange} />
          </label>
        }
      </Dialog>
    );
  }
};
