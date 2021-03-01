// settings-dialog.js - Settings dialog implementation.

import React from 'react';

import { Dialog } from '@marcoparrone/dialog';

import LanguageSelector from '@marcoparrone/react-language-selector';

export default class SettingsDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showedit: this.props.showedit,
      showmove: this.props.showmove,
      showadd: this.props.showadd,
      textarearows: this.props.textarearows,
      textareacols: this.props.textareacols,
      language: this.props.language,
      expandbydefault: this.props.expandbydefault
    };
    this.updateState = this.updateState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  updateState(showedit, showmove, showadd, textarearows, textareacols, language, expandbydefault) {
    this.setState({
      showedit: showedit,
      showmove: showmove,
      showadd: showadd,
      textarearows: textarearows,
      textareacols: textareacols,
      language: language,
      expandbydefault: expandbydefault
    });
  }

  handleInputChange(e) {
    switch (e.target.name) {
      case 'showedit':
        if (e.target.checked === true) {
          this.setState({ showedit: e.target.value });
        }
        break;
      case 'showmove':
        if (e.target.checked === true) {
          this.setState({ showmove: e.target.value });
        }
        break;
      case 'showadd':
        if (e.target.checked === true) {
          this.setState({ showadd: e.target.value });
        }
        break;
      case 'expandbydefault':
        if (e.target.checked === true) {
          this.setState({ expandbydefault: e.target.value });
        }
        break;
      case 'textarearows':
        this.setState({ textarearows: e.target.value });
        break;
      case 'textareacols':
        this.setState({ textareacols: e.target.value });
        break;
      case 'lang':
        this.setState({ language: e.target.value });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Dialog id="settings" title={this.props.text['text_settings_title']}
        actions={(<span><input type="submit" value={this.props.text['text_back'] || "Back"} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
          <input type="submit" value={this.props.text['text_save'] || "Save"} onClick={event => this.props.handleSettingsChange(this.state.showedit, this.state.showmove, this.state.showadd, this.state.textarearows, this.state.textareacols, this.state.language, this.state.expandbydefault)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></span>)}>
        <p>{this.props.text['text_settings_content1']}</p>
        <label>{this.props.text['text_settings_showedit']}
          <input type="radio" id="showedityes" name="showedit" value="yes" checked={this.state.showedit === 'yes'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_yes']}
          <input type="radio" id="showeditno" name="showedit" value="no" checked={this.state.showedit === 'no'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_no']}
        </label><br />
        <label>{this.props.text['text_settings_showmove']}
          <input type="radio" id="showmoveyes" name="showmove" value="yes" checked={this.state.showmove === 'yes'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_yes']}
          <input type="radio" id="showmoveno" name="showmove" value="no" checked={this.state.showmove === 'no'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_no']}
        </label><br />
        <label>{this.props.text['text_settings_showadd']}
          <input type="radio" id="showaddyes" name="showadd" value="yes" checked={this.state.showadd === 'yes'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_yes']}
          <input type="radio" id="showaddno" name="showadd" value="no" checked={this.state.showadd === 'no'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_no']}
        </label><br />
        <label>{this.props.text['text_settings_expandbydefault']}
          <input type="radio" id="expandbydefaultyes" name="expandbydefault" value="yes" checked={this.state.expandbydefault === 'yes'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_yes']}
          <input type="radio" id="expandbydefaultno" name="expandbydefault" value="no" checked={this.state.expandbydefault === 'no'} onChange={this.handleInputChange}>
          </input>{this.props.text['text_no']}
        </label><br />
        <label>{this.props.text['text_settings_rows']}
          <input type="text" id="textarearows" name="textarearows" value={this.state.textarearows} onChange={this.handleInputChange}></input>
        </label><br />
        <label>{this.props.text['text_settings_columns']}
          <input type="text" id="textareacols" name="textareacols" value={this.state.textareacols} onChange={this.handleInputChange}></input>
        </label><br />
        <LanguageSelector text_language={this.props.text['text_language']} language={this.state.language} handleSettingsChange={this.handleInputChange} />
      </Dialog>
    );
  }
};
