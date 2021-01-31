import React from 'react';
import './App.css';

import "@material/card/dist/mdc.card.css";
import '@material/react-material-icon/dist/material-icon.css';

import I18n from '@marcoparrone/i18n';

import saveAs from 'file-saver';

import get_timestamp from './timestamp';

import LanguageSelector from '@marcoparrone/react-language-selector';

import {Dialog, open_dialog} from '@marcoparrone/dialog';

import AppWithTopBar from '@marcoparrone/appwithtopbar';

import {Snackbar, open_snackbar} from '@marcoparrone/snackbar';

import IconButton from './iconbutton';

const defaultText = require ('./en.json');

class Note extends React.Component {
  render() {
    let content = [];
    let count = 0;
    let element = null;
    let keyprefix = "Note" + this.props.id;
    if (this.props.type === 'note') {
      content.push(<label key={keyprefix}>{this.props.title}&nbsp;
        <IconButton key={keyprefix + "-OpenButton"} label={this.props.text_open} icon='open_in_new' callback={event => this.props.openNote(this.props.id)} />;
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
    this.cursor = -1;
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
    this.swapNotes = this.swapNotes.bind(this);
    this.movebackwardNote = this.movebackwardNote.bind(this);
    this.moveforwardNote = this.moveforwardNote.bind(this);
    this.moveupwardNote = this.moveupwardNote.bind(this);
    this.movedownwardNote = this.movedownwardNote.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.importNotesReaderOnload = this.importNotesReaderOnload.bind(this);
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
    let newNotes = [];

    // I don't want for the visible value to grow indefinitely.
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].visible > 100) {
        this.notes[i].visible -= 100;
      }
    }

    // Save in current state.
    this.saveState();

    // Save in local storage, skipping deleted notes.
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].visible !== 0) {
        newNotes.push(this.notes[i]);
      }
    }
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }

  handleSubmit(cursor) {
    let newCursor = cursor.toString().split(".");
    let note = null;
    if (newCursor.length > 0) {
      note = this.notes[newCursor[0]];
    }
    for (let i = 1; i < newCursor.length; i++) {
      note = note.children[newCursor[i]];
    }
    note.title = this.state.tmptitle;
    note.type = this.state.tmptype;
    note.content = this.state.tmpcontent;
    this.saveNotes();
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
    let notes = localStorage.getItem('notes');
    if (notes) {
      this.notes = JSON.parse(notes);
      this.saveState();
    }
  }

  addNote(cursor) {
    let oldCursor = [];
    let newCursor = [];
    let note = null;
    let tmpnotes = [];
    let newNote = null;
    if (cursor === undefined || cursor === null) {
      newCursor = this.notes.length.toString();
      tmpnotes = this.notes;
    } else {
      oldCursor = cursor.toString().split(".");
      if (oldCursor.length > 0) {
        tmpnotes = this.notes;
        note = tmpnotes[oldCursor[0]];
        newCursor.push(oldCursor[0]);
      }
      for (let i = 1; i < oldCursor.length; i++) {
        tmpnotes = note.children;
        note = tmpnotes[oldCursor[i]];
        newCursor.push(oldCursor[i]);
      }
      if (note.children === undefined || note.children === null) {
        note.children = [];
      }
      tmpnotes = note.children;
      newCursor.push((note.children.length).toString());
      newCursor = newCursor.concat().join('.');
    }
    newNote = {
      type: 'note',
      title: this.state.text['text_example_title'] + newCursor,
      content: this.state.text['text_example_content'],
      visible: 1
    };
    tmpnotes.push(newNote);
    this.saveNotes();
    this.editNote(newCursor);
  }

  openNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    if (oldCursor.length > 0) {
      note = this.notes[oldCursor[0]];
    }
    for (let i = 1; i < oldCursor.length; i++) {
      note = note.children[oldCursor[i]];
    }
    this.cursor = cursor;
    this.tmptype = note.type;
    this.tmptitle = note.title;
    this.tmpcontent = note.content;
    this.saveState();
    open_dialog(this.notesListRef, 'opennote');
  }

  editNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    if (oldCursor.length > 0) {
      note = this.notes[oldCursor[0]];
    }
    for (let i = 1; i < oldCursor.length; i++) {
      note = note.children[oldCursor[i]];
    }
    this.cursor = cursor;
    this.tmptype = note.type;
    this.tmptitle = note.title;
    this.tmpcontent = note.content;
    this.saveState();
    open_dialog(this.notesListRef, 'editnote');
  }

  swapNotes(a, b) {
    let tmpnote = {};
    tmpnote.type = a.type;
    tmpnote.title = a.title;
    tmpnote.content = a.content;
    tmpnote.visible = a.visible;
    tmpnote.children = a.children;
    a.type = b.type;
    a.title = b.title;
    a.content = b.content;
    if (b.visible === 0) {
      a.visible = 0;
    } else {
      a.visible = b.visible + 1;
    }
    a.children = b.children;
    b.type = tmpnote.type;
    b.title = tmpnote.title;
    b.content = tmpnote.content;
    if (tmpnote.visible === 0) {
      b.visible = 0;
    } else {
      b.visible = tmpnote.visible + 1;
    }
    b.children = tmpnote.children;
  }

  movebackwardNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    let othernote = null;
    let i = 0;
    let tmpIntCusor = 0;
    let tmpParent = {};
    if (oldCursor.length > 0) {
      note = this.notes[oldCursor[0]];
      if (oldCursor.length === 1) {
        tmpIntCusor = parseInt(oldCursor[0]);
        for (let otherID = tmpIntCusor - 1; otherID >= 0 && otherID < this.notes.length; otherID--) {
          if (this.notes[otherID].visible !== 0) {
            othernote = this.notes[otherID];
            break;
          }
        }
      } else {
        for (i = 1; i < oldCursor.length; i++) {
          tmpParent = note;
          note = note.children[oldCursor[i]];
        }
        i--;
        tmpIntCusor = parseInt(oldCursor[i]);
        for (let otherID = tmpIntCusor - 1; otherID >= 0 && otherID < tmpParent.children.length; otherID--) {
          if (tmpParent.children[otherID].visible !== 0) {
            othernote = tmpParent.children[otherID];
            break;
          }
        }
      }
      if (othernote !== null) {
        this.swapNotes(note, othernote);
        this.saveNotes();
      }
    }
  }

  moveforwardNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    let othernote = null;
    let i = 0;
    let tmpIntCusor = 0;
    let tmpParent = {};
    if (oldCursor.length > 0) {
      note = this.notes[oldCursor[0]];
      if (oldCursor.length === 1) {
        tmpIntCusor = parseInt(oldCursor[0]);
        for (let otherID = tmpIntCusor + 1; otherID >= 0 && otherID < this.notes.length; otherID++) {
          if (this.notes[otherID].visible !== 0) {
            othernote = this.notes[otherID];
            break;
          }
        }
      } else {
        for (i = 1; i < oldCursor.length; i++) {
          tmpParent = note;
          note = note.children[oldCursor[i]];
        }
        i--;
        tmpIntCusor = parseInt(oldCursor[i]);
        for (let otherID = tmpIntCusor + 1; otherID >= 0 && otherID < tmpParent.children.length; otherID++) {
          if (tmpParent.children[otherID].visible !== 0) {
            othernote = tmpParent.children[otherID];
            break;
          }
        }
      }
      if (othernote !== null) {
        this.swapNotes(note, othernote);
        this.saveNotes();
      }
    }
  }

  moveupwardNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    let othernote = null;
    let i = 0;
    let tmpParent = {};
    let tmpParentParent = {};
    let newNote = {
      type: 'note',
      title: "InvisibleElement",
      content: "InvisibleContent",
      visible: 0
    };

    if (oldCursor.length > 2) {
      // I find the note, the parent, and the parent's parent.
      note = this.notes[oldCursor[0]];
      for (i = 1; i < oldCursor.length; i++) {
        tmpParentParent = tmpParent;
        tmpParent = note;
        note = note.children[oldCursor[i]];
      }

      // I add a new element to the parent's parent "children" array.
      tmpParentParent.children.push(newNote);

      // I swap the new element with the selected element.
      othernote = tmpParentParent.children[tmpParentParent.children.length - 1];
      if (othernote !== null) {
        this.swapNotes(note, othernote);
        this.saveNotes();
      }
    } else if (oldCursor.length > 1) {
      // I find the note, I already know the parent's parent (it's this.notes).
      note = this.notes[oldCursor[0]];
      for (i = 1; i < oldCursor.length; i++) {
        note = note.children[oldCursor[i]];
      }

      // I add a new element to the parent's parent "children" array.
      this.notes.push(newNote);

      // I swap the new element with the selected element.
      othernote = this.notes[this.notes.length - 1];
      if (othernote !== null) {
        this.swapNotes(note, othernote);
        this.saveNotes();
      }
    }
  }

  movedownwardNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    let othernote = null;
    let nextfolder = null;
    let i = 0;
    let tmpIntCusor = 0;
    let tmpParent = {};
    let newNote = {
      type: 'note',
      title: "InvisibleElement",
      content: "InvisibleContent",
      visible: 0
    };

    if (oldCursor.length > 0) {
      // I find the element and the next folder element.
      note = this.notes[oldCursor[0]];
      if (oldCursor.length === 1) {
        tmpIntCusor = parseInt(oldCursor[0]);
        for (let otherID = tmpIntCusor + 1; otherID >= 0 && otherID < this.notes.length; otherID++) {
          if (this.notes[otherID].visible !== 0 && this.notes[otherID].type === 'folder') {
            nextfolder = this.notes[otherID];
            break;
          }
        }
      } else {
        for (i = 1; i < oldCursor.length; i++) {
          tmpParent = note;
          note = note.children[oldCursor[i]];
        }
        i--;
        tmpIntCusor = parseInt(oldCursor[i]);
        for (let otherID = tmpIntCusor + 1; otherID >= 0 && otherID < tmpParent.children.length; otherID++) {
          if (tmpParent.children[otherID].visible !== 0 && tmpParent.children[otherID].type === 'folder') {
            nextfolder = tmpParent.children[otherID];
            break;
          }
        }
      }
      if (nextfolder !== null) {
        // I add a new element to the next folder "children" array.
        if (nextfolder.children === undefined) {
          nextfolder.children = [];
        }
        nextfolder.children.push(newNote);

        // I swap the new element with the selected element.
        othernote = nextfolder.children[nextfolder.children.length - 1];
        this.swapNotes(note, othernote);
        this.saveNotes();
      }
    }
  }

  deleteNote(cursor) {
    let oldCursor = cursor.toString().split(".");
    let note = null;
    if (oldCursor.length > 0) {
      note = this.notes[oldCursor[0]];
      for (let i = 1; i < oldCursor.length; i++) {
        note = note.children[oldCursor[i]];
      }
      note.visible = 0;
      this.saveNotes();
      this.forceUpdate();
    }
  }

  importNotesReaderOnload(e) {
    let newnotes = {};
    let missingFields = false;

    try {
      newnotes = JSON.parse(e.target.result);
    } catch {
      alert(this.state.text['text_error_fileformat']);
    } finally {
      for (let i = 0; i < newnotes.length; i++) {
        if (newnotes[i].type === undefined
          || newnotes[i].title === undefined
          || newnotes[i].content === undefined
          || newnotes[i].visible === undefined) {
          missingFields = true;
          alert(this.state.text['text_error_fileformat']);
          break;
        }
      }
  
      if (missingFields === false && newnotes.length > 0) {
        // Delete old notes.
        for (let i = 0; i < this.notes.length; i++) {
          this.deleteNote(i);
        }
        // Replace old notes with new notes
        this.notes = newnotes;
        // Save and display.
        this.saveNotes();
        this.forceUpdate();
      }
    }
  }

  importNotes(e) {
    let file = e.target.files[0];
    if (!file) {
      if (e.target.files.length > 0) {
        alert(this.state.text['text_error_loadfile']);
      }
      return;
    }
    let reader = new FileReader();
    reader.onload = this.importNotesReaderOnload;
    reader.readAsText(file);
  }

  exportNotes() {
    let newnotes = [];

    // Save in current state.
    this.saveState();

    // Export to JSON file, skipping deleted notes.
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].visible !== 0) {
        newnotes.push(this.notes[i]);
      }
    }

    saveAs(new Blob([JSON.stringify(newnotes)], { type: "application/json;charset=utf-8" }),
      'notes-' + get_timestamp() + '.json');
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
