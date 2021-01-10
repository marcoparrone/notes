import React from 'react';
import './App.css';

import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

import "@material/snackbar/dist/mdc.snackbar.css";
import { MDCSnackbar } from '@material/snackbar';

import "@material/dialog/dist/mdc.dialog.css";
import { MDCDialog } from '@material/dialog';

import "@material/card/dist/mdc.card.css";

import saveAs from 'file-saver';

import get_timestamp from './timestamp';

class Note extends React.Component {
  render() {
    let content = [];
    let count = 0;
    let element = null;
    let keyprefix = "Note" + this.props.id;
    if (this.props.type === 'note') {
      content.push(<label key={keyprefix}>{this.props.title}&nbsp;
          <button
          key={keyprefix + "OpenButton"}
          aria-pressed="false"
          aria-label="Open"
          title="Open"
          onClick={event => this.props.openNote(this.props.id)}>
          <i className="material-icons mdc-icon-button__icon">open_in_new</i>
        </button>
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
            />);
          }
        }
      }

      if (this.props.showadd === 'yes') {
        content.push(<button
          key={keyprefix + "AddButton"}
          aria-pressed="false"
          aria-label="Add"
          title="Add"
          onClick={event => this.props.addNote(this.props.id)}>
          <i className="material-icons mdc-icon-button__icon">add</i>
        </button>);
      }
    }

    if (this.props.showedit === 'yes') {
      content.push(<button
        key={keyprefix + "EditButton"}
        aria-pressed="false"
        aria-label="Edit"
        title="Edit"
        onClick={event => this.props.editNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">edit</i>
      </button>);
    }

    if (this.props.showmove === 'yes') {
      content.push(<button
        key={keyprefix + "BackwardButton"}
        aria-pressed="false"
        aria-label="Move Backward"
        title="Move Backward"
        onClick={event => this.props.movebackwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_left</i>
      </button>);
      content.push(<button
        key={keyprefix + "ForwardButton"}
        aria-pressed="false"
        aria-label="Move Forward"
        title="Move Forward"
        onClick={event => this.props.moveforwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_right</i>
      </button>);
      content.push(<button
        key={keyprefix + "UpwardButton"}
        aria-pressed="false"
        aria-label="Move Upward"
        title="Move Upward"
        onClick={event => this.props.moveupwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_up</i>
      </button>);
      content.push(<button
        key={keyprefix + "DownwardButton"}
        aria-pressed="false"
        aria-label="Move Downward"
        title="Move Downward"
        onClick={event => this.props.movedownwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_down</i>
      </button>);
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
      textareacols: this.textareacols
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
    this.about = this.about.bind(this);
    this.help = this.help.bind(this);
    this.Settings = this.Settings.bind(this);
    this.importExportNotes = this.importExportNotes.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.importNotesReaderOnload = this.importNotesReaderOnload.bind(this);
    this.importNotes = this.importNotes.bind(this);
    this.exportNotes = this.exportNotes.bind(this);
    this.notesListRef = React.createRef();
  }

  componentDidMount() {
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
    if (! isNaN(textarearows) && textarearows !== '' && parseInt(textarearows) <= 1000 && parseInt(textarearows) >=1) {
      this.textarearows = textarearows;
    }
    if (! isNaN(textarearows) && textarearows !== '' && parseInt(textarearows) <= 1000 && parseInt(textarearows) >=1) {
      this.textareacols = textareacols;
    }
    this.loadNotes();
  }

  componentWillUnmount() {

  }

  Settings() {
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#settings'));
    dialog.open();
  }

  importExportNotes() {
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#impexp'));
    dialog.open();
  }

  help() {
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#help'));
    dialog.open();
  }

  about() {
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#about'));
    dialog.open();
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
      textareacols: this.textareacols
    });

    // Save in local storage, skipping deleted notes.
    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].visible !== 0) {
        newNotes.push(this.notes[i]);
      }
    }
    localStorage.setItem('notes', JSON.stringify(newNotes));
  }

  handleSubmit(cursor) {
    let newCursor = cursor.split(".");
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
      textareacols: this.textareacols
    });
  }

  handleSettingsChange(e) {
    const snackbarMBN = new MDCSnackbar(this.notesListRef.current.querySelector('#mustBeNum'));
    const snackbarTB = new MDCSnackbar(this.notesListRef.current.querySelector('#tooBig'));
    const snackbarTS = new MDCSnackbar(this.notesListRef.current.querySelector('#tooSmall'));
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
          snackbarMBN.open();
        } else {
          tmpint = parseInt(e.target.value);
          if (tmpint > 1000) {
            snackbarTB.open();
          } else if (tmpint < 1) {
            snackbarTS.open();
          } else {
            this.textarearows = e.target.value;
            localStorage.setItem('notes_textarearows', this.textarearows);
          }
        }
        break;
      case 'textareacols':
        if (isNaN(e.target.value) || e.target.value === "") {
          snackbarMBN.open();
        } else {
          tmpint = parseInt(e.target.value);
          if (tmpint > 1000) {
            snackbarTB.open();
          } else if (tmpint < 1) {
            snackbarTS.open();
          } else {
            this.textareacols = e.target.value;
            localStorage.setItem('notes_textareacols', this.textareacols);
          }
        }
        break;
      default:
        break;
    }
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
      textareacols: this.textareacols
    });
  }

  loadNotes() {
    let notes = localStorage.getItem('notes');
    if (notes) {
      this.notes = JSON.parse(notes);
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
        textareacols: this.textareacols
      });
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
      oldCursor = cursor.split(".");
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
      title: "ExampleTitle" + newCursor,
      content: "ExampleContent",
      visible: 1
    };
    tmpnotes.push(newNote);
    this.saveNotes();
    this.editNote(newCursor);
  }

  openNote(cursor) {
    let oldCursor = cursor.split(".");
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
      textareacols: this.textareacols
    });
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#opennote'));
    dialog.open();
  }

  editNote(cursor) {
    let oldCursor = cursor.split(".");
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
      textareacols: this.textareacols
    });
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#editnote'));
    dialog.open();
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
    let oldCursor = cursor.split(".");
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
    let oldCursor = cursor.split(".");
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
    let oldCursor = cursor.split(".");
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
    let oldCursor = cursor.split(".");
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
    let oldCursor = cursor.split(".");
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
    let newnotes = JSON.parse(e.target.result);
    let missingFields = false;

    for (let i = 0; i < newnotes.length; i++) {
      if (newnotes[i].type === undefined
        || newnotes[i].title === undefined
        || newnotes[i].content === undefined
        || newnotes[i].visible === undefined)
        {
          missingFields = true;
          alert ('error: file format is wrong.');
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

  importNotes(e) {
    let file = e.target.files[0];
    if (!file) {
      if (e.target.files.length > 0) {
        alert('error: cannot load file.');
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
      textareacols: this.textareacols
    });

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
          />);
      }
    }
    return (
      <div ref={this.notesListRef}>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarTitle>Notes</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label="add a note"
                  hasRipple
                  icon='add'
                  onClick={() => this.addNote()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label="settings"
                  hasRipple
                  icon='settings'
                  onClick={() => this.Settings()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label="import and export notes"
                  hasRipple
                  icon='import_export'
                  onClick={() => this.importExportNotes()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label="help"
                  hasRipple
                  icon='help'
                  onClick={() => this.help()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label="about"
                  hasRipple
                  icon='info'
                  onClick={() => this.about()}
                />
              </TopAppBarIcon>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <TopAppBarFixedAdjust>

          <section className="notesSection">
            {notesRepresentation}
          </section>

          <div className="mdc-snackbar" id="mustBeNum"><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">Value must be a number!</div></div></div>
          <div className="mdc-snackbar" id="tooBig"><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">Selected value is too big!</div></div></div>
          <div className="mdc-snackbar" id="tooSmall"><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">Selected value is too small!</div></div></div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="opennote">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="opennote-dialog-title">{this.state.tmptitle}</h2>
                <div className="mdc-dialog__content" id="opennote-dialog-content">
                <pre>{this.state.tmpcontent}</pre>
                </div>
                <footer className="mdc-dialog__actions">
                  <input type="submit" value="Close" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
               </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="editnote">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="editnote-dialog-title">Edit note</h2>
                <div className="mdc-dialog__content" id="editnote-dialog-content">

                  <label>Type:
                          <input type="radio"
                      id="abktypenote"
                      name="tmptype"
                      value="note"
                      checked={this.state.tmptype === 'note'}
                      onChange={this.handleInputChange}>
                    </input>note
                          <input type="radio"
                      id="abktypefolder"
                      name="tmptype"
                      value="folder"
                      checked={this.state.tmptype === 'folder'}
                      onChange={this.handleInputChange}>
                    </input>folder
                        </label><br />
                  <label>Title:
                          <input type="text"
                      id="abktitle"
                      name="tmptitle"
                      value={this.state.tmptitle}
                      onChange={this.handleInputChange}>
                    </input>
                  </label><br />
                  {this.state.tmptype === 'note' &&
                    <label>Content:<br />
                    <textarea type="text"
                        id="abkcontent"
                        name="tmpcontent"
                        value={this.state.tmpcontent}
                        rows={this.state.textarearows}
                        cols={this.state.textareacols}
                        onChange={this.handleInputChange} />
                    </label>
                  }
                </div>
                <footer className="mdc-dialog__actions">
                  <input type="submit" value="Delete" onClick={event => this.deleteNote(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value="Back" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value="Save" onClick={event => this.handleSubmit(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="settings">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="settings-dialog-title">Settings</h2>
                <div className="mdc-dialog__content" id="settings-dialog-content">
                  <p>Here you can configure the application.</p>
                  <label>Show edit buttons:
                    <input type="radio"
                      id="showedityes"
                      name="showedit"
                      value="yes"
                      checked={this.state.showedit === 'yes'}
                      onChange={this.handleSettingsChange}>
                    </input>yes
                    <input type="radio"
                      id="showeditno"
                      name="showedit"
                      value="no"
                      checked={this.state.showedit === 'no'}
                      onChange={this.handleSettingsChange}>
                    </input>no
                  </label><br />

                  <label>Show movement buttons:
                    <input type="radio"
                      id="showmoveyes"
                      name="showmove"
                      value="yes"
                      checked={this.state.showmove === 'yes'}
                      onChange={this.handleSettingsChange}>
                    </input>yes
                    <input type="radio"
                      id="showmoveno"
                      name="showmove"
                      value="no"
                      checked={this.state.showmove === 'no'}
                      onChange={this.handleSettingsChange}>
                    </input>no
                  </label><br />

                  <label>Show "add" buttons in folders:
                    <input type="radio"
                      id="showaddyes"
                      name="showadd"
                      value="yes"
                      checked={this.state.showadd === 'yes'}
                      onChange={this.handleSettingsChange}>
                    </input>yes
                    <input type="radio"
                      id="showaddno"
                      name="showadd"
                      value="no"
                      checked={this.state.showadd === 'no'}
                      onChange={this.handleSettingsChange}>
                    </input>no
                  </label><br />

                  <label>Text area rows:
                    <input type="text"
                      id="textarearows"
                      name="textarearows"
                      value={this.state.textarearows}
                      onChange={this.handleSettingsChange}>
                    </input>
                  </label><br />

                  <label>Text area columns:
                    <input type="text"
                      id="textareacols"
                      name="textareacols"
                      value={this.state.textareacols}
                      onChange={this.handleSettingsChange}>
                    </input>
                  </label><br />

                </div>
                <footer className="mdc-dialog__actions">
                  <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                    <span className="mdc-button__label">Close</span>
                  </button>
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="impexp">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="impexp-dialog-title">Import/export</h2>
                <div className="mdc-dialog__content" id="impexp-dialog-content">
                  <p>Here you can import and export your notes.</p>
                </div>
                <footer className="mdc-dialog__actions">
                  <label>Import:&nbsp;<input type="file" onChange={e => this.importNotes(e)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></label>
                  <input type="submit" value="Back" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value="Export" onClick={event => this.exportNotes()} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="help">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="help-dialog-title">Help</h2>
                <div className="mdc-dialog__content" id="help-dialog-content">
                  <p>Notes is an app to save and organize notes.</p>
                  <p>To create a new note, or a new folder, press the "plus" icon: choose between note and folder, insert the title and eventually the content, then press save to save the changes, or press delete to delete the note, or back to skip the changes but keep the note.</p>
                  <p>Press the "open" button near a note to open the related content.</p>
                  <p>Press the "add" button inside a folder to add a new element to it.</p>
                  <p>For both notes and folders, press the "edit" button to modify them,
                  press the "move backward" button to exchange the position with the previous element,
                  press the "move forward" button to exchange the position with the next element,
                  press the "move upward" button to move the element out of the folder where it currently is,
                  or press the "move downward" button to move the element inside the next subfolder.
                  </p>
                  <p>In the settings menu, accessible after clicking on the "settings" icon, you can hide or show the editing, movement and addition buttons.</p>
                  <p>To import or export the notes, press on the import/export icon. The notes will be imported or exported in a JSON file specific to this app. When importing the notes from a file, the current notes will be deleted and overwritten.</p>
                  <p>Notes is a Progressive Web Application, which means that it runs inside a browser.
                  When you install it, while the browser components are not shown, it still runs inside a browser.
                  The notes are saved in the browser’s localStorage for the notes.marcoparrone.com domain.
                  localStorage works fine with Chrome, Edge and Firefox browsers. Other browsers may delete localStorage after some time.
                  Android by default uses Chrome, Windows by default uses Edge. Notes currently is not supported on Apple products.
                    With the purpose to help preventing the loss of the notes, it is suggested to make a backup using the "export" functionality, every time you make some modifications which you don't want to lose.</p>
                </div>
                <footer className="mdc-dialog__actions">
                  <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                    <span className="mdc-button__label">Close</span>
                  </button>
                </footer>
              </div>
            </div>
            <div className="mdc-dialog__scrim"></div>
          </div>


          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="about">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="about-dialog-title">About</h2>
                <div className="mdc-dialog__content" id="about-dialog-content">
                  <p>Copyright &copy; 2017,2019,2020,2021 Marco Parrone.</p>
                  <p>All Rights Reserved.</p>
                  <p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                          SOFTWARE.</p>
                </div>
                <footer className="mdc-dialog__actions">
                  <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                    <span className="mdc-button__label">Close</span>
                  </button>
                </footer>
              </div>
            </div>
            <div className="mdc-dialog__scrim"></div>
          </div>

        </TopAppBarFixedAdjust>
      </div >
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
