import React from 'react';
import './App.css';

import "@material/card/dist/mdc.card.css";
import '@material/react-material-icon/dist/material-icon.css';

import I18n from '@marcoparrone/i18n';

import {Dialog, open_dialog} from '@marcoparrone/dialog';

import AppWithTopBar from '@marcoparrone/appwithtopbar';

import {Snackbar, open_snackbar} from '@marcoparrone/snackbar';

import IconButton from './iconbutton';

import {
  add_node, get_node, change_node_field, delete_node,
  move_node_backward, move_node_forward, move_node_upward, move_node_downward,
  load_nodes, save_nodes, export_nodes, import_nodes
} from '@marcoparrone/nodes';

import EditDialog from './edit-dialog';
import OpenDialog from './open-dialog';
import SettingsDialog from './settings-dialog';

const defaultText = require ('./en.json');

class Note extends React.Component {
  render() {
    let content = [];
    let count = 0;
    let element = null;
    let keyprefix = "Note" + this.props.id;
    if (this.props.type === 'note') {
      content.push(<label key={keyprefix}>{this.props.title}&nbsp;
        <IconButton key={keyprefix + "-OpenButton"} label={this.props.text['text_open']} icon='open_in_new' callback={event => this.props.openNote(this.props.id)} />
      </label>);
    } else {
      content.push(<label key={keyprefix + "Label"}>{this.props.title}: </label>);
      content.push(<br key={keyprefix + "Br"} />);
      if (this.props.children !== undefined && this.props.children !== null && this.props.children !== []) {
        count = this.props.children.length;
        for (let i = 0; i < count; i++) {
          element = this.props.children[i];
          if (element.visible !== 0) {
            content.push(<Note
              id={this.props.id + "." + i.toString()}
              key={keyprefix + "." + i.toString()}
              type={element.type}
              title={element.title}
              content={element.content}
              children={element.children}
              showedit={this.props.showedit}
              showmove={this.props.showmove}
              showadd={this.props.showadd}
              addNote={this.props.addNote}
              openNote={this.props.openNote}
              editNote={this.props.editNote}
              movebackwardNote={this.props.movebackwardNote}
              moveforwardNote={this.props.moveforwardNote}
              moveupwardNote={this.props.moveupwardNote}
              movedownwardNote={this.props.movedownwardNote}
              text={this.props.text}
            />);
          }
        }
      }
      if (this.props.showadd === 'yes') {
        content.push(<IconButton key={keyprefix + "-AddButton"} label={this.props.text['text_add']} icon='add' callback={event => this.props.addNote(this.props.id)} />);
      }
    }
    if (this.props.showedit === 'yes') {
      content.push(<IconButton key={keyprefix + "-EditButton"} label={this.props.text['text_edit']} icon='edit' callback={event => this.props.editNote(this.props.id)} />);
    }
    if (this.props.showmove === 'yes') {
      content.push(<IconButton key={keyprefix + "-BackwardButton"} label={this.props.text['text_move_backward']} icon='keyboard_arrow_left' callback={event => this.props.movebackwardNote(this.props.id)} />);
      content.push(<IconButton key={keyprefix + "-ForwardButton"} label={this.props.text['text_move_forward']} icon='keyboard_arrow_right' callback={event => this.props.moveforwardNote(this.props.id)} />);
      content.push(<IconButton key={keyprefix + "-UpwardButton"} label={this.props.text['text_move_upward']} icon='keyboard_arrow_up' callback={event => this.props.moveupwardNote(this.props.id)} />);
      content.push(<IconButton key={keyprefix + "-DownwardButton"} label={this.props.text['text_move_downward']} icon='keyboard_arrow_down' callback={event => this.props.movedownwardNote(this.props.id)} />);
    }
    return (
      <div className="mdc-card  mdc-card--outlined" key={keyprefix + "Card"}>
        <div className="card-body mdc-typography--body2">
          {content}
        </div>
      </div>
    );
  }
}

class NotesList extends React.Component {

  constructor(props) {
    super(props);
    this.notes = [];
    this.showedit = 'yes';
    this.showmove = 'no';
    this.showadd = 'yes';
    this.textarearows = '20';
    this.textareacols = '30';

    this.i18n = { language: 'en', text: defaultText};

    this.state = { notes: this.notes };

    this.deleteNote = this.deleteNote.bind(this);

    this.addNote = this.addNote.bind(this);
    this.openNote = this.openNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.openSettings = this.openSettings.bind(this);

    this.movebackwardNote = this.movebackwardNote.bind(this);
    this.moveforwardNote = this.moveforwardNote.bind(this);
    this.moveupwardNote = this.moveupwardNote.bind(this);
    this.movedownwardNote = this.movedownwardNote.bind(this);

    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.importNotes = this.importNotes.bind(this);
    this.exportNotes = this.exportNotes.bind(this);

    this.notesListRef = React.createRef();
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
    this.loadNotes();
  }

  componentWillUnmount() {

  }

  saveNotes() {
    save_nodes(this.notes, 'notes');
    this.setState({notes: this.notes});
  }

  handleSubmit(cursor, type, title, content) {
    change_node_field(this.notes, cursor, 'title', title);
    change_node_field(this.notes, cursor, 'type', type);
    change_node_field(this.notes, cursor, 'content', content);
    this.saveNotes();
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
      toupdate = true;
    }
    if (toupdate) {
      this.forceUpdate();
    }
  }

  loadNotes() {
    let notes = load_nodes('notes');
    if (notes) {
      this.notes = notes;
      this.setState({ notes: this.notes });
    }
  }

  addNote(cursor) {
    let newnote = {
      type: 'note',
      title: '',
      content: this.i18n.text['text_example_content'],
      visible: 1
    };
    let newCursor = add_node(this.notes, cursor, newnote);
    change_node_field(this.notes, newCursor, 'title', this.i18n.text['text_example_title'] + ' ' + newCursor);
    this.saveNotes();
    this.editNote(newCursor);
  }

  openNote(cursor) {
    let note = get_node(this.notes, cursor);
    if (note) {
      this.OpenDialogRef.current.updateState(note.title, note.content);
      open_dialog(this.notesListRef, 'opennote');
    }
  }

  editNote(cursor) {
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

  movebackwardNote(cursor) {
    if (move_node_backward(this.notes, cursor)) {
      this.saveNotes();
    }
  }

  moveforwardNote(cursor) {
    if (move_node_forward(this.notes, cursor)) {
      this.saveNotes();
    }
  }

  moveupwardNote(cursor) {
    const emptynode = {type: 'note', title: "InvisibleElement", content: "InvisibleContent", visible: 0};
    if (move_node_upward(this.notes, cursor, emptynode)) {
      this.saveNotes();
    }
  }

  movedownwardNote(cursor) {
    const emptynode = {type: 'note', title: "InvisibleElement", content: "InvisibleContent", visible: 0};
    if (move_node_downward(this.notes, cursor, emptynode)) {
      this.saveNotes();
    }
  }

  deleteNote(cursor) {
    if (delete_node(this.notes, cursor)) {
      this.saveNotes();
      this.forceUpdate();
    }
  }

  importNotes(evt) {
    import_nodes(this.notes, evt, ['type', 'title', 'content', 'visible'], this.i18n.text['text_error_loadfile'], this.i18n.text['text_error_fileformat'], () => {
      // Save and display.
      this.saveNotes();
      this.forceUpdate();
    });
  }

  exportNotes() {
    export_nodes(this.notes, 'notes');
  }

  render() {
    let notesRepresentation = [];
    for (let i = 0; i < this.state.notes.length; i++) {
      if (this.notes[i].visible !== 0) {
        notesRepresentation.push(
          <Note
            id={i.toString()}
            key={'Note' + i + ' ' + this.state.notes[i].visible}
            type={this.state.notes[i].type}
            title={this.state.notes[i].title}
            content={this.state.notes[i].content}
            children={this.state.notes[i].children}
            visible={this.state.notes[i].visible}
            showedit={this.showedit}
            showmove={this.showmove}
            showadd={this.showadd}
            addNote={this.addNote}
            openNote={this.openNote}
            editNote={this.editNote}
            movebackwardNote={this.movebackwardNote}
            moveforwardNote={this.moveforwardNote}
            moveupwardNote={this.moveupwardNote}
            movedownwardNote={this.movedownwardNote}
            text={this.i18n.text}
          />);
      }
    }
    return (
			<AppWithTopBar refprop={this.notesListRef} lang={this.i18n.language} appname={this.i18n.text['text_appname']}
			  icons={[{label: this.i18n.text['text_add_label'], icon: 'add', callback: () => this.addNote()},
								{label: this.i18n.text['text_settings_label'], icon: 'settings', callback: () => this.openSettings()},
								{label: this.i18n.text['text_importexport_label'], icon: 'import_export', callback: () => open_dialog(this.notesListRef, 'impexp')},
								{label: this.i18n.text['text_help_label'], icon: 'help', callback: () => open_dialog(this.notesListRef, 'help')},
								{label: this.i18n.text['text_about_label'], icon: 'info', callback: () =>  open_dialog(this.notesListRef, 'about')}]} >
          <section className="notesSection">
            {notesRepresentation}
          </section>
          <Snackbar id="mustBeNum">{this.i18n.text['text_snack_mustbenum']}</Snackbar>
          <Snackbar id="tooBig">{this.i18n.text['text_snack_toobig']}</Snackbar>
          <Snackbar id="tooSmall">{this.i18n.text['text_snack_toosmall']}</Snackbar>
          <OpenDialog id="OpenDialog" ref={this.OpenDialogRef} text={this.i18n.text} />
          <EditDialog id="EditDialog" ref={this.EditDialogRef} text={this.i18n.text} textarearows={this.textarearows} textareacols={this.textareacols}
           deleteNote={this.deleteNote} handleSubmit={this.handleSubmit} />
          <SettingsDialog id="SettingsDialog" ref={this.SettingsDialogRef} text={this.i18n.text}
           showedit={this.showedit} showmove={this.showmove} showadd={this.showadd}
           textarearows={this.textarearows} textareacols={this.textareacols} language={this.i18n.language} 
           handleSettingsChange={this.handleSettingsChange} />
          <Dialog id="impexp" title={this.i18n.text['text_importexport_title']}
                  actions={(<span>
                    <label>{this.i18n.text['text_import']}
                    &nbsp;
                    <input type="file" onChange={e => this.importNotes(e)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></label>
                    <input type="submit" value={this.i18n.text['text_back'] || "Back"} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                    <input type="submit" value={this.i18n.text['text_export'] || "Export"} onClick={event => this.exportNotes()} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></span>)} >
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
      <NotesList />
    </div>
  );
}

export default App;
