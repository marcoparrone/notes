import React from 'react';
import './App.css';

import I18n from '@marcoparrone/i18n';

import {Dialog, open_dialog} from '@marcoparrone/dialog';

import AppWithTopBar from '@marcoparrone/appwithtopbar';

import {Snackbar, open_snackbar} from '@marcoparrone/snackbar';

import { add_node, get_node, change_node_field, delete_node, load_nodes, export_nodes, import_nodes } from '@marcoparrone/nodes';

import EditDialog from './edit-dialog';
import OpenDialog from './open-dialog';
import SettingsDialog from './settings-dialog';

import NodesArray from './react-nodes';

const defaultText = require ('./en.json');

class NodesList extends React.Component {

  constructor(props) {
    super(props);
    this.notes = [];
    this.showedit = 'yes';
    this.showmove = 'no';
    this.showadd = 'yes';
    this.textarearows = '20';
    this.textareacols = '30';

    this.i18n = { language: 'en', text: defaultText};

    this.saveNodes = this.saveNodes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.loadNodes = this.loadNodes.bind(this);
    this.addNode = this.addNode.bind(this);
    this.openNode = this.openNode.bind(this);
    this.editNode = this.editNode.bind(this);
    this.openSettings = this.openSettings.bind(this);
    this.deleteNode = this.deleteNode.bind(this);
    this.importNodes = this.importNodes.bind(this);
    this.exportNodes = this.exportNodes.bind(this);

    this.notesListRef = React.createRef();
    this.NodesArrayRef = React.createRef();
    this.EditDialogRef = React.createRef();
    this.OpenDialogRef = React.createRef();
    this.SettingsDialogRef = React.createRef();
  }

  componentDidMount() {
    // Load the basic localStorage data.
    let showedit = localStorage.getItem('notes_showedit');
    let showmove = localStorage.getItem('notes_showmove');
    let showadd = localStorage.getItem('notes_showadd');
    let textarearows = localStorage.getItem('notes_textarearows');
    let textareacols = localStorage.getItem('notes_textareacols');

    if (showedit === 'yes' || showedit === 'no') {
      this.showedit = showedit;
    }
    if (showmove === 'yes' || showmove === 'no') {
      this.showmove = showmove;
    }
    if (showadd === 'yes' || showadd === 'no') {
      this.showadd = showadd;
    }
    if (!isNaN(textarearows) && textarearows !== '' && parseInt(textarearows) <= 1000 && parseInt(textarearows) >= 1) {
      this.textarearows = textarearows;
    }
    if (!isNaN(textareacols) && textareacols !== '' && parseInt(textareacols) <= 1000 && parseInt(textareacols) >= 1) {
      this.textareacols = textareacols;
    }

    // Localize the User Interface.
    this.i18n = new I18n(() => {this.forceUpdate()});

    // Load the notes from localStorage.
    this.loadNodes();
  }

  saveNodes() {
    this.NodesArrayRef.current.saveNodes(this.notes);
  }

  handleSubmit(cursor, type, title, content) {
    change_node_field(this.notes, cursor, 'title', title);
    change_node_field(this.notes, cursor, 'type', type);
    change_node_field(this.notes, cursor, 'content', content);
    this.saveNodes();
  }

  handleSettingsChange(showedit, showmove, showadd, textarearows, textareacols, language) {
    let tmpint=0;
    let toupdate = false;
    if (this.showedit !== showedit) {
      this.showedit = showedit;
      localStorage.setItem('notes_showedit', showedit);
      toupdate = true;
    }
    if (this.showmove !== showmove) {
      this.showmove = showmove;
      localStorage.setItem('notes_showmove', showmove);
      toupdate = true;
    }
    if (this.showadd !== showadd) {
      this.showadd = showadd;
      localStorage.setItem('notes_showadd', showadd);
      toupdate = true;
    }
    if (this.textarearows !== textarearows) {
      if (isNaN(textarearows) || textarearows === "") {
        open_snackbar(this.notesListRef, 'mustBeNum');
      } else {
        tmpint = parseInt(textarearows);
        if (tmpint > 1000) {
          open_snackbar(this.notesListRef, 'tooBig');
        } else if (tmpint < 1) {
          open_snackbar(this.notesListRef, 'tooSmall');
        } else {
          this.textarearows = textarearows;
          localStorage.setItem('notes_textarearows', textarearows);
          toupdate = true;
        }
      }
    }
    if (this.textareacols !== textareacols) {
      if (isNaN(textareacols) || textareacols === "") {
        open_snackbar(this.notesListRef, 'mustBeNum');
      } else {
        tmpint = parseInt(textareacols);
        if (tmpint > 1000) {
          open_snackbar(this.notesListRef, 'tooBig');
        } else if (tmpint < 1) {
          open_snackbar(this.notesListRef, 'tooSmall');
        } else {
          this.textareacols = textareacols;
          localStorage.setItem('notes_textareacols', textareacols);
          toupdate = true;
        }
      }
    }
    if (this.i18n.language !== language) {
      this.i18n.change_language_translate_and_save_to_localStorage(language);
      // changing language already calls forceUpdate
      toupdate=false;
    }
    if (toupdate) {
      this.forceUpdate();
    }
  }

  loadNodes() {
    let notes = load_nodes('notes');
    if (notes) {
      this.notes = notes;
      this.NodesArrayRef.current.updateState(this.notes);
    }
  }

  addNode(cursor) {
    let newnote = {
      type: 'note',
      title: '',
      content: this.i18n.text['text_example_content'],
      visible: 1
    };
    let newCursor = add_node(this.notes, cursor, newnote);
    change_node_field(this.notes, newCursor, 'title', this.i18n.text['text_example_title'] + ' ' + newCursor);
    this.saveNodes();
    this.editNode(newCursor);
  }

  openNode(cursor) {
    let note = get_node(this.notes, cursor);
    if (note) {
      this.OpenDialogRef.current.updateState(note.title, note.content);
      open_dialog(this.notesListRef, 'opennote');
    }
  }

  editNode(cursor) {
    let note = get_node(this.notes, cursor);
    if (note) {
      this.EditDialogRef.current.updateState(cursor, note.type, note.title, note.content);
      open_dialog(this.notesListRef, 'editnote');
    }
  }

  openSettings() {
    this.SettingsDialogRef.current.updateState(this.showedit, this.showmove, this.showadd, this.textarearows, this.textareacols, this.i18n.language);
    open_dialog(this.notesListRef, 'settings');
  }

  deleteNode(cursor) {
    if (delete_node(this.notes, cursor)) {
      this.saveNodes();
      this.forceUpdate();
    }
  }

  importNodes(evt) {
    import_nodes(this.notes, evt, ['type', 'title', 'content', 'visible'], this.i18n.text['text_error_loadfile'], this.i18n.text['text_error_fileformat'], () => {
      // Save and display.
      this.saveNodes();
      this.forceUpdate();
    });
  }

  exportNodes() {
    export_nodes(this.notes, 'notes');
  }

  render() {
    return (
			<AppWithTopBar refprop={this.notesListRef} lang={this.i18n.language} appname={this.i18n.text['text_appname']}
			  icons={[{label: this.i18n.text['text_add_label'], icon: 'add', callback: () => this.addNode()},
								{label: this.i18n.text['text_settings_label'], icon: 'settings', callback: () => this.openSettings()},
								{label: this.i18n.text['text_importexport_label'], icon: 'import_export', callback: () => open_dialog(this.notesListRef, 'impexp')},
								{label: this.i18n.text['text_help_label'], icon: 'help', callback: () => open_dialog(this.notesListRef, 'help')},
								{label: this.i18n.text['text_about_label'], icon: 'info', callback: () =>  open_dialog(this.notesListRef, 'about')}]} >
          <NodesArray key="NodesArray" ref={this.NodesArrayRef} item="notes" text={this.i18n.text}
            nodes={this.nodes} showedit={this.showedit} showmove={this.showmove} showadd={this.showadd}
            addNode={this.addNode} openNode={this.openNode} editNode={this.editNode} />
          <Snackbar id="mustBeNum">{this.i18n.text['text_snack_mustbenum']}</Snackbar>
          <Snackbar id="tooBig">{this.i18n.text['text_snack_toobig']}</Snackbar>
          <Snackbar id="tooSmall">{this.i18n.text['text_snack_toosmall']}</Snackbar>
          <OpenDialog id="OpenDialog" ref={this.OpenDialogRef} text={this.i18n.text} />
          <EditDialog id="EditDialog" ref={this.EditDialogRef} text={this.i18n.text} textarearows={this.textarearows} textareacols={this.textareacols}
           deleteNode={this.deleteNode} handleSubmit={this.handleSubmit} />
          <SettingsDialog id="SettingsDialog" ref={this.SettingsDialogRef} text={this.i18n.text}
           showedit={this.showedit} showmove={this.showmove} showadd={this.showadd}
           textarearows={this.textarearows} textareacols={this.textareacols} language={this.i18n.language} 
           handleSettingsChange={this.handleSettingsChange} />
          <Dialog id="impexp" title={this.i18n.text['text_importexport_title']}
                  actions={(<span>
                    <label>{this.i18n.text['text_import']}
                    &nbsp;
                    <input type="file" onChange={e => this.importNodes(e)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></label>
                    <input type="submit" value={this.i18n.text['text_back'] || "Back"} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                    <input type="submit" value={this.i18n.text['text_export'] || "Export"} onClick={event => this.exportNodes()} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></span>)} >
            <p>{this.i18n.text['text_importexport_content']}</p>
          </Dialog>
          <Dialog id="help" title={this.i18n.text['text_help_title']} text_close_button={this.i18n.text['text_close_button']} >
            <p>{this.i18n.text['text_help_content1']}</p>
            <p>{this.i18n.text['text_help_content2']}</p>
            <p>{this.i18n.text['text_help_content3']}</p>
            <p>{this.i18n.text['text_help_content4']}</p>
            <p>{this.i18n.text['text_help_content5']}</p>
            <p>{this.i18n.text['text_help_content6']}</p>
            <p>{this.i18n.text['text_help_content7']}</p>
            <p>{this.i18n.text['text_help_content8']}</p>
          </Dialog>
          <Dialog id="about" title={this.i18n.text['text_about_title']} text_close_button={this.i18n.text['text_close_button']} >
            <p>{this.i18n.text['text_about_content1']}
                <br />{this.i18n.text['text_about_content2']}</p>
            <p>{this.i18n.text['text_about_content3']}</p>
            <p>{this.i18n.text['text_about_content4']}</p>
            <p>{this.i18n.text['text_about_content5']}</p>
            <p>{this.i18n.text['text_about_content6']}</p>
          </Dialog>
        </AppWithTopBar>
    );
  }
}

function App() {
  return (
    <div className="App">
      <NodesList />
    </div>
  );
}

export default App;
