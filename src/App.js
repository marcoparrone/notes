import React from 'react';
import './App.css';

import "@material/card/dist/mdc.card.css";
import '@material/react-material-icon/dist/material-icon.css';

import I18n from '@marcoparrone/i18n';

import LanguageSelector from '@marcoparrone/react-language-selector';

import {Dialog, open_dialog} from '@marcoparrone/dialog';

import AppWithTopBar from '@marcoparrone/appwithtopbar';

import {Snackbar, open_snackbar} from '@marcoparrone/snackbar';

import IconButton from './iconbutton';

import {
  add_node, get_node, change_node_field, delete_node, swap_nodes_values,
  move_node_backward, move_node_forward, move_node_upward, move_node_downward,
  load_nodes, save_nodes, export_nodes, import_nodes
} from './nodes';

const defaultText = require ('./en.json');

class Note extends React.Component {
  render() {
    let content = [];
    let count = 0;
    let element = null;
    let keyprefix = "Note" + this.props.id;
    if (this.props.type === 'note') {
      content.push(<label key={keyprefix}>{this.props.title}&nbsp;
        <IconButton key={keyprefix + "-OpenButton"} label={this.props.text_open} icon='open_in_new' callback={event => this.props.openNote(this.props.id)} />
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
        content.push(<IconButton key={keyprefix + "-AddButton"} label={this.props.text_add} icon='add' callback={event => this.props.addNote(this.props.id)} />);
      }
    }
    if (this.props.showedit === 'yes') {
      content.push(<IconButton key={keyprefix + "-EditButton"} label={this.props.text_edit} icon='edit' callback={event => this.props.editNote(this.props.id)} />);
    }
    if (this.props.showmove === 'yes') {
      content.push(<IconButton key={keyprefix + "-BackwardButton"} label={this.props.text_move_backward} icon='keyboard_arrow_left' callback={event => this.props.movebackwardNote(this.props.id)} />);
      content.push(<IconButton key={keyprefix + "-ForwardButton"} label={this.props.text_move_forward} icon='keyboard_arrow_right' callback={event => this.props.moveforwardNote(this.props.id)} />);
      content.push(<IconButton key={keyprefix + "-UpwardButton"} label={this.props.text_move_upward} icon='keyboard_arrow_up' callback={event => this.props.moveupwardNote(this.props.id)} />);
      content.push(<IconButton key={keyprefix + "-DownwardButton"} label={this.props.text_move_downward} icon='keyboard_arrow_down' callback={event => this.props.movedownwardNote(this.props.id)} />);
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
    this.cursor = "";
    this.tmptype = 'note';
    this.tmptitle = '';
    this.tmpcontent = '';
    this.showedit = 'yes';
    this.showmove = 'no';
    this.showadd = 'yes';
    this.textarearows = '20';
    this.textareacols = '30';

    this.i18n = {};

    this.state = {
      notes: this.notes,
      cursor: this.cursor,
      tmptype: this.tmptype,
      tmptitle: this.tmptitle,
      tmpcontent: this.tmpcontent,
      showedit: this.showedit,
      showmove: this.showmove,
      showadd: this.showadd,
      textarearows: this.textarearows,
      textareacols: this.textareacols,
      language: this.i18n.language,
      text: defaultText
    };
    this.deleteNote = this.deleteNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.openNote = this.openNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.movebackwardNote = this.movebackwardNote.bind(this);
    this.moveforwardNote = this.moveforwardNote.bind(this);
    this.moveupwardNote = this.moveupwardNote.bind(this);
    this.movedownwardNote = this.movedownwardNote.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.importNotes = this.importNotes.bind(this);
    this.exportNotes = this.exportNotes.bind(this);
    this.saveState = this.saveState.bind(this);
    this.notesListRef = React.createRef();
  }

  saveState () {
    if (this.i18n.text) {
      this.setState({
        notes: this.notes,
        cursor: this.cursor,
        tmptype: this.tmptype,
        tmptitle: this.tmptitle,
        tmpcontent: this.tmpcontent,
        showedit: this.showedit,
        showmove: this.showmove,
        showadd: this.showadd,
        textarearows: this.textarearows,
        textareacols: this.textareacols,
        language: this.i18n.language,
        text: this.i18n.text
      });
    } else {
      this.setState({
        notes: this.notes,
        cursor: this.cursor,
        tmptype: this.tmptype,
        tmptitle: this.tmptitle,
        tmpcontent: this.tmpcontent,
        showedit: this.showedit,
        showmove: this.showmove,
        showadd: this.showadd,
        textarearows: this.textarearows,
        textareacols: this.textareacols,
        language: 'en',
        text: defaultText
      });
    }
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
    if (!isNaN(textarearows) && textarearows !== '' && parseInt(textarearows) <= 1000 && parseInt(textarearows) >= 1) {
      this.textareacols = textareacols;
    }

    // Localize the User Interface.
    this.i18n = new I18n(this.saveState);

    // Load the notes from localStorage.
    this.loadNotes();
  }

  componentWillUnmount() {

  }

  saveNotes() {
    save_nodes(this.notes, 'notes');
    this.setState({notes: this.notes});
  }

  handleSubmit(cursor) {
    let note = get_node(this.notes, cursor);
    if (note) {
      note.title = this.state.tmptitle;
      note.type = this.state.tmptype;
      note.content = this.state.tmpcontent;
      this.saveNotes();
    }
  }

  handleInputChange(e) {
    switch (e.target.name) {
      case 'tmptype':
        if (e.target.checked === true) {
          this.tmptype = e.target.value;
        }
        break;
      case 'tmptitle':
        this.tmptitle = e.target.value;
        break;
      case 'tmpcontent':
        this.tmpcontent = e.target.value;
        break;
      default:
        break;
    }
    this.saveState();
  }

  handleSettingsChange(e) {
    let tmpint = 0;

    switch (e.target.name) {
      case 'showedit':
        if (e.target.checked === true) {
          this.showedit = e.target.value;
          localStorage.setItem('notes_showedit', this.showedit);
        }
        break;
      case 'showmove':
        if (e.target.checked === true) {
          this.showmove = e.target.value;
          localStorage.setItem('notes_showmove', this.showmove);
        }
        break;
      case 'showadd':
        if (e.target.checked === true) {
          this.showadd = e.target.value;
          localStorage.setItem('notes_showadd', this.showadd);
        }
        break;
      case 'textarearows':
        if (isNaN(e.target.value) || e.target.value === "") {
          open_snackbar (this.notesListRef, 'mustBeNum');
        } else {
          tmpint = parseInt(e.target.value);
          if (tmpint > 1000) {
            open_snackbar (this.notesListRef, 'tooBig');
          } else if (tmpint < 1) {
            open_snackbar (this.notesListRef, 'tooSmall');
          } else {
            this.textarearows = e.target.value;
            localStorage.setItem('notes_textarearows', this.textarearows);
          }
        }
        break;
      case 'textareacols':
        if (isNaN(e.target.value) || e.target.value === "") {
          open_snackbar (this.notesListRef, 'mustBeNum');
        } else {
          tmpint = parseInt(e.target.value);
          if (tmpint > 1000) {
            open_snackbar (this.notesListRef, 'tooBig');
          } else if (tmpint < 1) {
            open_snackbar (this.notesListRef, 'tooSmall');
          } else {
            this.textareacols = e.target.value;
            localStorage.setItem('notes_textareacols', this.textareacols);
          }
        }
        break;
      case 'lang':
        this.i18n.change_language_translate_and_save_to_localStorage(e.target.value);
        break;
      default:
        break;
    }
    this.saveState();
  }

  loadNotes() {
    let notes = load_nodes('notes');
    if (notes) {
      this.notes = notes;
      this.saveState();
    }
  }

  addNote(cursor) {
    let newnote = {
      type: 'note',
      title: '',
      content: this.state.text['text_example_content'],
      visible: 1
    };
    let newCursor = add_node(this.notes, cursor, newnote);
    change_node_field(this.notes, newCursor, 'title', this.state.text['text_example_title'] + ' ' + newCursor);
    this.saveNotes();
    this.editNote(newCursor);
  }

  openNote(cursor) {
    let note = get_node(this.notes, cursor);
    if (note) {
      this.cursor = cursor;
      this.tmptype = note.type;
      this.tmptitle = note.title;
      this.tmpcontent = note.content;
      this.saveState();
      open_dialog(this.notesListRef, 'opennote');
    }
  }

  editNote(cursor) {
    let note = get_node(this.notes, cursor);
    if (note) {
      this.cursor = cursor;
      this.tmptype = note.type;
      this.tmptitle = note.title;
      this.tmpcontent = note.content;
      this.saveState();
      open_dialog(this.notesListRef, 'editnote');
    }
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
    import_nodes(this.notes, evt, this.state.text['text_error_loadfile'], this.state.text['text_error_fileformat'], () => {
      // Save and display.
      this.saveNotes();
      this.forceUpdate();
    });
  }

  exportNotes() {
    this.saveState();
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
            text={this.state.text}
          />);
      }
    }
    return (
			<AppWithTopBar refprop={this.notesListRef} lang={this.state.language} appname={this.state.text['text_appname']}
			  icons={[{label: this.state.text['text_add_label'], icon: 'add', callback: () => this.addNote()},
								{label: this.state.text['text_settings_label'], icon: 'settings', callback: () => open_dialog(this.notesListRef, 'settings')},
								{label: this.state.text['text_importexport_label'], icon: 'import_export', callback: () => open_dialog(this.notesListRef, 'impexp')},
								{label: this.state.text['text_help_label'], icon: 'help', callback: () => open_dialog(this.notesListRef, 'help')},
								{label: this.state.text['text_about_label'], icon: 'info', callback: () =>  open_dialog(this.notesListRef, 'about')}]} >
          <section className="notesSection">
            {notesRepresentation}
          </section>
          <Snackbar id="mustBeNum">{this.state.text['text_snack_mustbenum']}</Snackbar>
          <Snackbar id="tooBig">{this.state.text['text_snack_toobig']}</Snackbar>
          <Snackbar id="tooSmall">{this.state.text['text_snack_toosmall']}</Snackbar>
          <Dialog id="opennote" title={this.state.tmptitle} text_close_button={this.state.text['text_close_button']} >
            <pre>{this.state.tmpcontent}</pre>
          </Dialog>
          <Dialog id="editnote" title={this.state.text['text_edit_title']}
                  actions={(<span><input type="submit" value={this.state.text['text_delete']} onClick={event => this.deleteNote(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value={this.state.text['text_back']} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value={this.state.text['text_save']} onClick={event => this.handleSubmit(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></span>)}>
            <label>{this.state.text['text_edit_type']}
              <input type="radio" id="abktypenote" name="tmptype" value="note" checked={this.state.tmptype === 'note'} onChange={this.handleInputChange}>
              </input>{this.state.text['text_edit_note']}
              <input type="radio" id="abktypefolder" name="tmptype" value="folder" checked={this.state.tmptype === 'folder'} onChange={this.handleInputChange}>
              </input>{this.state.text['text_edit_folder']}
            </label><br />
            <label>{this.state.text['text_edit_note_title']}
              <input type="text" id="abktitle" name="tmptitle" value={this.state.tmptitle} onChange={this.handleInputChange}></input>
            </label><br />
            {this.state.tmptype === 'note' &&
              <label>{this.state.text['text_edit_content']}<br />
                <textarea type="text"
                  id="abkcontent"
                  name="tmpcontent"
                  value={this.state.tmpcontent}
                  rows={this.state.textarearows}
                  cols={this.state.textareacols}
                  onChange={this.handleInputChange} />
              </label>
            }
          </Dialog>
          <Dialog id="settings" title={this.state.text['text_settings_title']} text_close_button={this.state.text['text_close_button']} >
            <p>{this.state.text['text_settings_content1']}</p>
            <label>{this.state.text['text_settings_showedit']}
              <input type="radio" id="showedityes" name="showedit" value="yes" checked={this.state.showedit === 'yes'} onChange={this.handleSettingsChange}>
              </input>{this.state.text['text_yes']}
              <input type="radio" id="showeditno" name="showedit" value="no" checked={this.state.showedit === 'no'} onChange={this.handleSettingsChange}>
              </input>{this.state.text['text_no']}
            </label><br />
            <label>{this.state.text['text_settings_showmove']}
              <input type="radio" id="showmoveyes" name="showmove" value="yes" checked={this.state.showmove === 'yes'} onChange={this.handleSettingsChange}>
              </input>{this.state.text['text_yes']}
              <input type="radio" id="showmoveno" name="showmove" value="no" checked={this.state.showmove === 'no'} onChange={this.handleSettingsChange}>
              </input>{this.state.text['text_no']}
            </label><br />
            <label>{this.state.text['text_settings_showadd']}
              <input type="radio" id="showaddyes" name="showadd" value="yes" checked={this.state.showadd === 'yes'} onChange={this.handleSettingsChange}>
              </input>{this.state.text['text_yes']}
              <input type="radio" id="showaddno" name="showadd" value="no" checked={this.state.showadd === 'no'} onChange={this.handleSettingsChange}>
              </input>{this.state.text['text_no']}
            </label><br />
            <label>{this.state.text['text_settings_rows']}
              <input type="text" id="textarearows" name="textarearows" value={this.state.textarearows} onChange={this.handleSettingsChange}></input>
            </label><br />
            <label>{this.state.text['text_settings_columns']}
              <input type="text" id="textareacols" name="textareacols" value={this.state.textareacols} onChange={this.handleSettingsChange}></input>
            </label><br />
            <LanguageSelector text_language={this.state.text['text_language']} language={this.state.language} handleSettingsChange={this.handleSettingsChange} />
          </Dialog>
          <Dialog id="impexp" title={this.state.text['text_importexport_title']}
                  actions={(<span>
                    <label>{this.state.text['text_import']}
                    &nbsp;
                    <input type="file" onChange={e => this.importNotes(e)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></label>
                    <input type="submit" value={this.state.text['text_back']} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                    <input type="submit" value={this.state.text['text_export']} onClick={event => this.exportNotes()} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></span>)} >
            <p>{this.state.text['text_importexport_content']}</p>
          </Dialog>
          <Dialog id="help" title={this.state.text['text_help_title']} text_close_button={this.state.text['text_close_button']} >
            <p>{this.state.text['text_help_content1']}</p>
            <p>{this.state.text['text_help_content2']}</p>
            <p>{this.state.text['text_help_content3']}</p>
            <p>{this.state.text['text_help_content4']}</p>
            <p>{this.state.text['text_help_content5']}</p>
            <p>{this.state.text['text_help_content6']}</p>
            <p>{this.state.text['text_help_content7']}</p>
            <p>{this.state.text['text_help_content8']}</p>
          </Dialog>
          <Dialog id="about" title={this.state.text['text_about_title']} text_close_button={this.state.text['text_close_button']} >
            <p>{this.state.text['text_about_content1']}
                <br />{this.state.text['text_about_content2']}</p>
            <p>{this.state.text['text_about_content3']}</p>
            <p>{this.state.text['text_about_content4']}</p>
            <p>{this.state.text['text_about_content5']}</p>
            <p>{this.state.text['text_about_content6']}</p>
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
