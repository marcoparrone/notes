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

import Banana from 'banana-i18n';
import HtmlParse from 'html-react-parser';

import get_timestamp from './timestamp';

const text_appname = 'Notes';
const text_add_label = 'add a note';
const text_settings_label = 'settings';
const text_importexport_label = 'import and export notes';
const text_help_label = 'help';
const text_about_label = 'about';
const text_close_label = 'close';
const text_snack_mustbenum = 'Value must be a number!';
const text_snack_toobig = 'Selected value is too big!';
const text_snack_toosmall = 'Selected value is too small!';
const text_edit_title = 'Edit note';
const text_edit_type = 'Type:';
const text_edit_note = 'note';
const text_edit_folder = 'folder';
const text_edit_note_title = 'Title:';
const text_edit_content = 'Content:';
const text_delete = 'Delete';
const text_back = 'Back';
const text_save = 'Save';
const text_settings_title = 'Settings';
const text_settings_content1 = 'Here you can configure the application.';
const text_yes = 'yes';
const text_no = 'no';
const text_settings_showedit = 'Show edit buttons:';
const text_settings_showmove = 'Show movement buttons:';
const text_settings_showadd = 'Show "add" buttons in folders:';
const text_settings_rows = 'Text area rows:';
const text_settings_columns = 'Text area columns:';
const text_language = 'Choose language:';
const text_close_button = 'Close';
const text_importexport_title = 'Import/export';
const text_importexport_content = 'Here you can import and export your notes.';
const text_import = 'Import:';
const text_export = 'Export';
const text_error_loadfile = 'error: cannot load file.';
const text_error_fileformat = 'error: file format is wrong.';
const text_example_title = 'ExampleTitle';
const text_example_content = 'ExampleContent';
const text_open = 'Open';
const text_add = 'Add';
const text_edit = 'Edit';
const text_move_backward = 'Move Backward';
const text_move_forward = 'Move Forward';
const text_move_upward = 'Move Upward';
const text_move_downward = 'Move Downward';
const text_help_title = 'Help';
const text_about_title = 'About';
const text_help_content = `<p>Notes is an app to save and organize notes.</p>
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
  With the purpose to help to prevent the loss of the notes, it is suggested to make a backup using the "export" functionality, every time you make some modifications that you don't want to lose.</p>
</div>`;
const text_about_content1 = `<p>Copyright © 2017,2019,2020,2021 Marco Parrone.
<br />All Rights Reserved.</p>
<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</p>`;
const text_about_content2 = `
<p>THIS SERVICE MAY CONTAIN TRANSLATIONS POWERED BY GOOGLE. GOOGLE DISCLAIMS ALL WARRANTIES RELATED TO THE TRANSLATIONS, EXPRESS OR IMPLIED, INCLUDING ANY WARRANTIES OF ACCURACY, RELIABILITY, AND ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.</p>
`;
const text_about_content3 = `
<p>This web app has been translated for your convenience using translation software powered by Google Translate. Reasonable efforts have been made to provide an accurate translation, however, no automated translation is perfect nor is it intended to replace human translators. Translations are provided as a service to users of the marcoparrone.com website, and are provided "as is." No warranty of any kind, either expressed or implied, is made as to the accuracy, reliability, or correctness of any translations made from English into any other language. Some content (such as images, videos, Flash, etc.) may not be accurately translated due to the limitations of the translation software.</p>
<p>The official text is the English version of the website. Any discrepancies or differences created in the translation are not binding and have no legal effect for compliance or enforcement purposes. If any questions arise related to the accuracy of the information contained in the translated website, refer to the English version of the website which is the official version.</p>
`;

const supported_languages = ['en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu', 'he', 'zh'];


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
          aria-label={this.props.text_open}
          title={this.props.text_open}
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
              text_open={this.props.text_open}
              text_add={this.props.text_add}
              text_edit={this.props.text_edit}
              text_move_backward={this.props.text_move_backward}
              text_move_forward={this.props.text_move_forward}
              text_move_upward={this.props.text_move_upward}
              text_move_downward={this.props.text_move_downward}
            />);
          }
        }
      }

      if (this.props.showadd === 'yes') {
        content.push(<button
          key={keyprefix + "AddButton"}
          aria-pressed="false"
          aria-label={this.props.text_add}
          title={this.props.text_add}
          onClick={event => this.props.addNote(this.props.id)}>
          <i className="material-icons mdc-icon-button__icon">add</i>
        </button>);
      }
    }

    if (this.props.showedit === 'yes') {
      content.push(<button
        key={keyprefix + "EditButton"}
        aria-pressed="false"
        aria-label={this.props.text_edit}
        title={this.props.text_edit}
        onClick={event => this.props.editNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">edit</i>
      </button>);
    }

    if (this.props.showmove === 'yes') {
      content.push(<button
        key={keyprefix + "BackwardButton"}
        aria-pressed="false"
        aria-label={this.props.text_move_backward}
        title={this.props.text_move_backward}
        onClick={event => this.props.movebackwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_left</i>
      </button>);
      content.push(<button
        key={keyprefix + "ForwardButton"}
        aria-pressed="false"
        aria-label={this.props.text_move_forward}
        title={this.props.text_move_forward}
        onClick={event => this.props.moveforwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_right</i>
      </button>);
      content.push(<button
        key={keyprefix + "UpwardButton"}
        aria-pressed="false"
        aria-label={this.props.text_move_upward}
        title={this.props.text_move_upward}
        onClick={event => this.props.moveupwardNote(this.props.id)}>
        <i className="material-icons mdc-icon-button__icon">keyboard_arrow_up</i>
      </button>);
      content.push(<button
        key={keyprefix + "DownwardButton"}
        aria-pressed="false"
        aria-label={this.props.text_move_downward}
        title={this.props.text_move_downward}
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

    this.language = '';
    this.text_appname = text_appname;
    this.text_add_label = text_add_label;
    this.text_settings_label = text_settings_label;
    this.text_importexport_label = text_importexport_label;
    this.text_help_label = text_help_label;
    this.text_about_label = text_about_label;
    this.text_close_label = text_close_label;
    this.text_snack_mustbenum = text_snack_mustbenum;
    this.text_snack_toobig = text_snack_toobig;
    this.text_snack_toosmall = text_snack_toosmall;
    this.text_edit_title = text_edit_title;
    this.text_edit_type = text_edit_type;
    this.text_edit_note = text_edit_note;
    this.text_edit_folder = text_edit_folder;
    this.text_edit_note_title = text_edit_note_title;
    this.text_edit_content = text_edit_content;
    this.text_delete = text_delete;
    this.text_back = text_back;
    this.text_save = text_save;
    this.text_settings_title = text_settings_title;
    this.text_settings_content1 = text_settings_content1;
    this.text_yes = text_yes;
    this.text_no = text_no;
    this.text_settings_showedit = text_settings_showedit;
    this.text_settings_showmove = text_settings_showmove;
    this.text_settings_showadd = text_settings_showadd;
    this.text_settings_rows = text_settings_rows;
    this.text_settings_columns = text_settings_columns;
    this.text_language = text_language;
    this.text_close_button = text_close_button;
    this.text_importexport_title = text_importexport_title;
    this.text_importexport_content = text_importexport_content;
    this.text_import = text_import;
    this.text_export = text_export;
    this.text_error_loadfile = text_error_loadfile;
    this.text_error_fileformat = text_error_fileformat;
    this.text_example_title = text_example_title;
    this.text_example_content = text_example_content;
    this.text_open = text_open;
    this.text_add = text_add;
    this.text_edit = text_edit;
    this.text_move_backward = text_move_backward;
    this.text_move_forward = text_move_forward;
    this.text_move_upward = text_move_upward;
    this.text_move_downward = text_move_downward;
    this.text_help_title = text_help_title;
    this.text_about_title = text_about_title;
    this.text_help_content = text_help_content;
    this.text_about_content1 = text_about_content1;
    this.text_about_content2 = text_about_content2;
    this.text_about_content3 = text_about_content3;

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
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
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

  i18n_init() {
    let banana = new Banana();

    if (this.language === '' && navigator && navigator.languages) {
      this.language = navigator.languages.find(lang => { return supported_languages.includes(lang) });
      if (!this.language) {
        this.language = 'en';
      }
    }

    banana.setLocale(this.language);
    fetch('i18n/' + banana.locale + '.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          return response.json();
        }
      })
      .then((messages) => {
        banana.load(messages, banana.locale);
        this.text_appname = banana.i18n('text_appname');
        this.text_add_label = banana.i18n('text_add_label');
        this.text_settings_label = banana.i18n('text_settings_label');
        this.text_importexport_label = banana.i18n('text_importexport_label');
        this.text_help_label = banana.i18n('text_help_label');
        this.text_about_label = banana.i18n('text_about_label');
        this.text_close_label = banana.i18n('text_close_label');
        this.text_snack_mustbenum = banana.i18n('text_snack_mustbenum');
        this.text_snack_toobig = banana.i18n('text_snack_toobig');
        this.text_snack_toosmall = banana.i18n('text_snack_toosmall');
        this.text_edit_title = banana.i18n('text_edit_title');
        this.text_edit_type = banana.i18n('text_edit_type');
        this.text_edit_note = banana.i18n('text_edit_note');
        this.text_edit_folder = banana.i18n('text_edit_folder');
        this.text_edit_note_title = banana.i18n('text_edit_note_title');
        this.text_edit_content = banana.i18n('text_edit_content');
        this.text_delete = banana.i18n('text_delete');
        this.text_back = banana.i18n('text_back');
        this.text_save = banana.i18n('text_save');
        this.text_settings_title = banana.i18n('text_settings_title');
        this.text_settings_content1 = banana.i18n('text_settings_content1');
        this.text_yes = banana.i18n('text_yes');
        this.text_no = banana.i18n('text_no');
        this.text_settings_showedit = banana.i18n('text_settings_showedit');
        this.text_settings_showmove = banana.i18n('text_settings_showmove');
        this.text_settings_showadd = banana.i18n('text_settings_showadd');
        this.text_settings_rows = banana.i18n('text_settings_rows');
        this.text_settings_columns = banana.i18n('text_settings_columns');
        this.text_language = banana.i18n('text_language');
        this.text_close_button = banana.i18n('text_close_button');
        this.text_importexport_title = banana.i18n('text_importexport_title');
        this.text_importexport_content = banana.i18n('text_importexport_content');
        this.text_import = banana.i18n('text_import');
        this.text_export = banana.i18n('text_export');
        this.text_error_loadfile = banana.i18n('text_error_loadfile');
        this.text_error_fileformat = banana.i18n('text_error_fileformat');
        this.text_example_title = banana.i18n('text_example_title');
        this.text_example_content = banana.i18n('text_example_content');
        this.text_open = banana.i18n('text_open');
        this.text_add = banana.i18n('text_add');
        this.text_edit = banana.i18n('text_edit');
        this.text_move_backward = banana.i18n('text_move_backward');
        this.text_move_forward = banana.i18n('text_move_forward');
        this.text_move_upward = banana.i18n('text_move_upward');
        this.text_move_downward = banana.i18n('text_move_downward');
        this.text_help_title = banana.i18n('text_help_title');
        this.text_about_title = banana.i18n('text_about_title');
        this.text_help_content = banana.i18n('text_help_content');
        this.text_about_content1 = banana.i18n('text_about_content1');
        this.text_about_content2 = banana.i18n('text_about_content2');
        this.text_about_content3 = banana.i18n('text_about_content3');

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
          language: this.language,
          text_appname: this.text_appname,
          text_add_label: this.text_add_label,
          text_settings_label: this.text_settings_label,
          text_importexport_label: this.text_importexport_label,
          text_help_label: this.text_help_label,
          text_about_label: this.text_about_label,
          text_close_label: this.text_close_label,
          text_snack_mustbenum: this.text_snack_mustbenum,
          text_snack_toobig: this.text_snack_toobig,
          text_snack_toosmall: this.text_snack_toosmall,
          text_edit_title: this.text_edit_title,
          text_edit_type: this.text_edit_type,
          text_edit_note: this.text_edit_note,
          text_edit_folder: this.text_edit_folder,
          text_edit_note_title: this.text_edit_note_title,
          text_edit_content: this.text_edit_content,
          text_delete: this.text_delete,
          text_back: this.text_back,
          text_save: this.text_save,
          text_settings_title: this.text_settings_title,
          text_settings_content1: this.text_settings_content1,
          text_yes: this.text_yes,
          text_no: this.text_no,
          text_settings_showedit: this.text_settings_showedit,
          text_settings_showmove: this.text_settings_showmove,
          text_settings_showadd: this.text_settings_showadd,
          text_settings_rows: this.text_settings_rows,
          text_settings_columns: this.text_settings_columns,
          text_language: this.text_language,
          text_close_button: this.text_close_button,
          text_importexport_title: this.text_importexport_title,
          text_importexport_content: this.text_importexport_content,
          text_import: this.text_import,
          text_export: this.text_export,
          text_error_loadfile: this.text_error_loadfile,
          text_error_fileformat: this.text_error_fileformat,
          text_example_title: this.text_example_title,
          text_example_content: this.text_example_content,
          text_open: this.text_open,
          text_add: this.text_add,
          text_edit: this.text_edit,
          text_move_backward: this.text_move_backward,
          text_move_forward: this.text_move_forward,
          text_move_upward: this.text_move_upward,
          text_move_downward: this.text_move_downward,
          text_help_title: this.text_help_title,
          text_about_title: this.text_about_title,
          text_help_content: this.text_help_content,
          text_about_content1: this.text_about_content1,
          text_about_content2: this.text_about_content2,
          text_about_content3: this.text_about_content3
        });
      })
      .catch(error => {
        console.error('Cannot fetch i18n/' + banana.locale + '.json: ', error);
      });
  }

  componentDidMount() {
    // Load the basic localStorage data.
    let showedit = localStorage.getItem('notes_showedit');
    let showmove = localStorage.getItem('notes_showmove');
    let showadd = localStorage.getItem('notes_showadd');
    let textarearows = localStorage.getItem('notes_textarearows');
    let textareacols = localStorage.getItem('notes_textareacols');
    let language = localStorage.getItem('language');

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
    if (supported_languages.includes(language)) {
      this.language = language;
    }
    
    // Localize the User Interface.
    this.i18n_init();

    // Load the notes from localStorage.
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
      textareacols: this.textareacols,
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
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
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
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
      case 'lang':
        if (supported_languages.includes(e.target.value)) {
          this.language = e.target.value;
          this.i18n_init();
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
      textareacols: this.textareacols,
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
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
        textareacols: this.textareacols,
        language: this.language,
        text_appname: this.text_appname,
        text_add_label: this.text_add_label,
        text_settings_label: this.text_settings_label,
        text_importexport_label: this.text_importexport_label,
        text_help_label: this.text_help_label,
        text_about_label: this.text_about_label,
        text_close_label: this.text_close_label,
        text_snack_mustbenum: this.text_snack_mustbenum,
        text_snack_toobig: this.text_snack_toobig,
        text_snack_toosmall: this.text_snack_toosmall,
        text_edit_title: this.text_edit_title,
        text_edit_type: this.text_edit_type,
        text_edit_note: this.text_edit_note,
        text_edit_folder: this.text_edit_folder,
        text_edit_note_title: this.text_edit_note_title,
        text_edit_content: this.text_edit_content,
        text_delete: this.text_delete,
        text_back: this.text_back,
        text_save: this.text_save,
        text_settings_title: this.text_settings_title,
        text_settings_content1: this.text_settings_content1,
        text_yes: this.text_yes,
        text_no: this.text_no,
        text_settings_showedit: this.text_settings_showedit,
        text_settings_showmove: this.text_settings_showmove,
        text_settings_showadd: this.text_settings_showadd,
        text_settings_rows: this.text_settings_rows,
        text_settings_columns: this.text_settings_columns,
        text_language: this.text_language,
        text_close_button: this.text_close_button,
        text_importexport_title: this.text_importexport_title,
        text_importexport_content: this.text_importexport_content,
        text_import: this.text_import,
        text_export: this.text_export,
        text_error_loadfile: this.text_error_loadfile,
        text_error_fileformat: this.text_error_fileformat,
        text_example_title: this.text_example_title,
        text_example_content: this.text_example_content,
        text_open: this.text_open,
        text_add: this.text_add,
        text_edit: this.text_edit,
        text_move_backward: this.text_move_backward,
        text_move_forward: this.text_move_forward,
        text_move_upward: this.text_move_upward,
        text_move_downward: this.text_move_downward,
        text_help_title: this.text_help_title,
        text_about_title: this.text_about_title,
        text_help_content: this.text_help_content,
        text_about_content1: this.text_about_content1,
        text_about_content2: this.text_about_content2,
        text_about_content3: this.text_about_content3
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
      title: this.text_example_title + newCursor,
      content: this.text_example_content,
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
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
    });
    const dialog = new MDCDialog(this.notesListRef.current.querySelector('#opennote'));
    dialog.open();
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
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
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
    let newnotes = JSON.parse(e.target.result);
    let missingFields = false;

    for (let i = 0; i < newnotes.length; i++) {
      if (newnotes[i].type === undefined
        || newnotes[i].title === undefined
        || newnotes[i].content === undefined
        || newnotes[i].visible === undefined) {
        missingFields = true;
        alert(this.text_error_fileformat);
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
        alert(this.text_error_loadfile);
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
      textareacols: this.textareacols,
      language: this.language,
      text_appname: this.text_appname,
      text_add_label: this.text_add_label,
      text_settings_label: this.text_settings_label,
      text_importexport_label: this.text_importexport_label,
      text_help_label: this.text_help_label,
      text_about_label: this.text_about_label,
      text_close_label: this.text_close_label,
      text_snack_mustbenum: this.text_snack_mustbenum,
      text_snack_toobig: this.text_snack_toobig,
      text_snack_toosmall: this.text_snack_toosmall,
      text_edit_title: this.text_edit_title,
      text_edit_type: this.text_edit_type,
      text_edit_note: this.text_edit_note,
      text_edit_folder: this.text_edit_folder,
      text_edit_note_title: this.text_edit_note_title,
      text_edit_content: this.text_edit_content,
      text_delete: this.text_delete,
      text_back: this.text_back,
      text_save: this.text_save,
      text_settings_title: this.text_settings_title,
      text_settings_content1: this.text_settings_content1,
      text_yes: this.text_yes,
      text_no: this.text_no,
      text_settings_showedit: this.text_settings_showedit,
      text_settings_showmove: this.text_settings_showmove,
      text_settings_showadd: this.text_settings_showadd,
      text_settings_rows: this.text_settings_rows,
      text_settings_columns: this.text_settings_columns,
      text_language: this.text_language,
      text_close_button: this.text_close_button,
      text_importexport_title: this.text_importexport_title,
      text_importexport_content: this.text_importexport_content,
      text_import: this.text_import,
      text_export: this.text_export,
      text_error_loadfile: this.text_error_loadfile,
      text_error_fileformat: this.text_error_fileformat,
      text_example_title: this.text_example_title,
      text_example_content: this.text_example_content,
      text_open: this.text_open,
      text_add: this.text_add,
      text_edit: this.text_edit,
      text_move_backward: this.text_move_backward,
      text_move_forward: this.text_move_forward,
      text_move_upward: this.text_move_upward,
      text_move_downward: this.text_move_downward,
      text_help_title: this.text_help_title,
      text_about_title: this.text_about_title,
      text_help_content: this.text_help_content,
      text_about_content1: this.text_about_content1,
      text_about_content2: this.text_about_content2,
      text_about_content3: this.text_about_content3
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
            text_open={this.state.text_open}
            text_add={this.state.text_add}
            text_edit={this.state.text_edit}
            text_move_backward={this.state.text_move_backward}
            text_move_forward={this.state.text_move_forward}
            text_move_upward={this.state.text_move_upward}
            text_move_downward={this.state.text_move_downward}
          />);
      }
    }
    return (
      <div ref={this.notesListRef}>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarTitle>{this.state.text_appname}</TopAppBarTitle>
            </TopAppBarSection>
            <TopAppBarSection align='end' role='toolbar'>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label={this.state.text_add_label}
                  hasRipple
                  icon='add'
                  onClick={() => this.addNote()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label={this.state.text_settings_label}
                  hasRipple
                  icon='settings'
                  onClick={() => this.Settings()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label={this.state.text_importexport_label}
                  hasRipple
                  icon='import_export'
                  onClick={() => this.importExportNotes()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label={this.state.text_help_label}
                  hasRipple
                  icon='help'
                  onClick={() => this.help()}
                />
              </TopAppBarIcon>
              <TopAppBarIcon actionItem tabIndex={0}>
                <MaterialIcon
                  aria-label={this.state.text_about_label}
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

          <div className="mdc-snackbar" id="mustBeNum"><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">{this.state.text_snack_mustbenum}</div></div></div>
          <div className="mdc-snackbar" id="tooBig"><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">{this.state.text_snack_toobig}</div></div></div>
          <div className="mdc-snackbar" id="tooSmall"><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">{this.state.text_snack_toosmall}</div></div></div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="opennote">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="opennote-dialog-title">{this.state.tmptitle}</h2>
                <div className="mdc-dialog__content" id="opennote-dialog-content">
                  <pre>{this.state.tmpcontent}</pre>
                </div>
                <footer className="mdc-dialog__actions">
                  <input type="submit" value={this.state.text_close_label} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="editnote">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="editnote-dialog-title">{this.state.text_edit_title}</h2>
                <div className="mdc-dialog__content" id="editnote-dialog-content">

                  <label>{this.state.text_edit_type}
                    <input type="radio"
                      id="abktypenote"
                      name="tmptype"
                      value="note"
                      checked={this.state.tmptype === 'note'}
                      onChange={this.handleInputChange}>
                    </input>{this.state.text_edit_note}
                    <input type="radio"
                      id="abktypefolder"
                      name="tmptype"
                      value="folder"
                      checked={this.state.tmptype === 'folder'}
                      onChange={this.handleInputChange}>
                    </input>{this.state.text_edit_folder}
                  </label><br />
                  <label>{this.state.text_edit_note_title}
                    <input type="text"
                      id="abktitle"
                      name="tmptitle"
                      value={this.state.tmptitle}
                      onChange={this.handleInputChange}>
                    </input>
                  </label><br />
                  {this.state.tmptype === 'note' &&
                    <label>{this.state.text_edit_content}<br />
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
                  <input type="submit" value={this.state.text_delete} onClick={event => this.deleteNote(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value={this.state.text_back} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value={this.state.text_save} onClick={event => this.handleSubmit(this.state.cursor)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="settings">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="settings-dialog-title">{this.state.text_settings_title}</h2>
                <div className="mdc-dialog__content" id="settings-dialog-content">
                  <p>{this.state.text_settings_content1}</p>
                  <label>{this.state.text_settings_showedit}
                    <input type="radio"
                      id="showedityes"
                      name="showedit"
                      value="yes"
                      checked={this.state.showedit === 'yes'}
                      onChange={this.handleSettingsChange}>
                    </input>{this.state.text_yes}
                    <input type="radio"
                      id="showeditno"
                      name="showedit"
                      value="no"
                      checked={this.state.showedit === 'no'}
                      onChange={this.handleSettingsChange}>
                    </input>{this.state.text_no}
                  </label><br />

                  <label>{this.state.text_settings_showmove}
                    <input type="radio"
                      id="showmoveyes"
                      name="showmove"
                      value="yes"
                      checked={this.state.showmove === 'yes'}
                      onChange={this.handleSettingsChange}>
                    </input>{this.state.text_yes}
                    <input type="radio"
                      id="showmoveno"
                      name="showmove"
                      value="no"
                      checked={this.state.showmove === 'no'}
                      onChange={this.handleSettingsChange}>
                    </input>{this.state.text_no}
                  </label><br />

                  <label>{this.state.text_settings_showadd}
                    <input type="radio"
                      id="showaddyes"
                      name="showadd"
                      value="yes"
                      checked={this.state.showadd === 'yes'}
                      onChange={this.handleSettingsChange}>
                    </input>{this.state.text_yes}
                    <input type="radio"
                      id="showaddno"
                      name="showadd"
                      value="no"
                      checked={this.state.showadd === 'no'}
                      onChange={this.handleSettingsChange}>
                    </input>{this.state.text_no}
                  </label><br />

                  <label>{this.state.text_settings_rows}
                    <input type="text"
                      id="textarearows"
                      name="textarearows"
                      value={this.state.textarearows}
                      onChange={this.handleSettingsChange}>
                    </input>
                  </label><br />

                  <label>{this.state.text_settings_columns}
                    <input type="text"
                      id="textareacols"
                      name="textareacols"
                      value={this.state.textareacols}
                      onChange={this.handleSettingsChange}>
                    </input>
                  </label><br />

                  <label for="lang">{this.state.text_language}</label>

                  <select id="lang" name="lang" value={this.state.language} onChange={this.handleSettingsChange}>
                    <option value="af">Afrikaans</option>
                    <option value="sq">Albanian</option>
                    <option value="am">Amharic</option>
                    <option value="ar">Arabic</option>
                    <option value="hy">Armenian</option>
                    <option value="az">Azerbaijani</option>
                    <option value="eu">Basque</option>
                    <option value="be">Belarusian</option>
                    <option value="bn">Bengali</option>
                    <option value="bs">Bosnian</option>
                    <option value="bg">Bulgarian</option>
                    <option value="ca">Catalan</option>
                    <option value="ceb">Cebuano</option>
                    <option value="ny">Chichewa</option>
                    <option value="zh-CN">Chinese</option>
                    <option value="zh-TW">Chinese</option>
                    <option value="co">Corsican</option>
                    <option value="hr">Croatian</option>
                    <option value="cs">Czech</option>
                    <option value="da">Danish</option>
                    <option value="nl">Dutch</option>
                    <option value="en">English</option>
                    <option value="eo">Esperanto</option>
                    <option value="et">Estonian</option>
                    <option value="tl">Filipino</option>
                    <option value="fi">Finnish</option>
                    <option value="fr">French</option>
                    <option value="fy">Frisian</option>
                    <option value="gl">Galician</option>
                    <option value="ka">Georgian</option>
                    <option value="de">German</option>
                    <option value="el">Greek</option>
                    <option value="gu">Gujarati</option>
                    <option value="ht">Haitian</option>
                    <option value="ha">Hausa</option>
                    <option value="haw">Hawaiian</option>
                    <option value="iw">Hebrew</option>
                    <option value="hi">Hindi</option>
                    <option value="hmn">Hmong</option>
                    <option value="hu">Hungarian</option>
                    <option value="is">Icelandic</option>
                    <option value="ig">Igbo</option>
                    <option value="id">Indonesian</option>
                    <option value="ga">Irish</option>
                    <option value="it">Italian</option>
                    <option value="ja">Japanese</option>
                    <option value="jw">Javanese</option>
                    <option value="kn">Kannada</option>
                    <option value="kk">Kazakh</option>
                    <option value="km">Khmer</option>
                    <option value="rw">Kinyarwanda</option>
                    <option value="ko">Korean</option>
                    <option value="ku">Kurdish</option>
                    <option value="ky">Kyrgyz</option>
                    <option value="lo">Lao</option>
                    <option value="la">Latin</option>
                    <option value="lv">Latvian</option>
                    <option value="lt">Lithuanian</option>
                    <option value="lb">Luxembourgish</option>
                    <option value="mk">Macedonian</option>
                    <option value="mg">Malagasy</option>
                    <option value="ms">Malay</option>
                    <option value="ml">Malayalam</option>
                    <option value="mt">Maltese</option>
                    <option value="mi">Maori</option>
                    <option value="mr">Marathi</option>
                    <option value="mn">Mongolian</option>
                    <option value="my">Myanmar</option>
                    <option value="ne">Nepali</option>
                    <option value="no">Norwegian</option>
                    <option value="or">Odia</option>
                    <option value="ps">Pashto</option>
                    <option value="fa">Persian</option>
                    <option value="pl">Polish</option>
                    <option value="pt">Portuguese</option>
                    <option value="pa">Punjabi</option>
                    <option value="ro">Romanian</option>
                    <option value="ru">Russian</option>
                    <option value="sm">Samoan</option>
                    <option value="gd">Scots</option>
                    <option value="sr">Serbian</option>
                    <option value="st">Sesotho</option>
                    <option value="sn">Shona</option>
                    <option value="sd">Sindhi</option>
                    <option value="si">Sinhala</option>
                    <option value="sk">Slovak</option>
                    <option value="sl">Slovenian</option>
                    <option value="so">Somali</option>
                    <option value="es">Spanish</option>
                    <option value="su">Sundanese</option>
                    <option value="sw">Swahili</option>
                    <option value="sv">Swedish</option>
                    <option value="tg">Tajik</option>
                    <option value="ta">Tamil</option>
                    <option value="tt">Tatar</option>
                    <option value="te">Telugu</option>
                    <option value="th">Thai</option>
                    <option value="tr">Turkish</option>
                    <option value="tk">Turkmen</option>
                    <option value="uk">Ukrainian</option>
                    <option value="ur">Urdu</option>
                    <option value="ug">Uyghur</option>
                    <option value="uz">Uzbek</option>
                    <option value="vi">Vietnamese</option>
                    <option value="cy">Welsh</option>
                    <option value="xh">Xhosa</option>
                    <option value="yi">Yiddish</option>
                    <option value="yo">Yoruba</option>
                    <option value="zu">Zulu</option>
                    <option value="he">Hebrew</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                <footer className="mdc-dialog__actions">
                  <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                    <span className="mdc-button__label">{this.state.text_close_button}</span>
                  </button>
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="impexp">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="impexp-dialog-title">{this.state.text_importexport_title}</h2>
                <div className="mdc-dialog__content" id="impexp-dialog-content">
                  <p>{this.state.text_importexport_content}</p>
                </div>
                <footer className="mdc-dialog__actions">
                  <label>{this.state.text_import}&nbsp;<input type="file" onChange={e => this.importNotes(e)} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" /></label>
                  <input type="submit" value={this.state.text_back} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                  <input type="submit" value={this.state.text_export} onClick={event => this.exportNotes()} className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes" />
                </footer>
              </div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="help">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="help-dialog-title">{this.state.text_help_title}</h2>
                <div className="mdc-dialog__content" id="help-dialog-content">
                  {HtmlParse(this.state.text_help_content)}
                </div>
                <footer className="mdc-dialog__actions">
                  <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                    <span className="mdc-button__label">{this.state.text_close_button}</span>
                  </button>
                </footer>
              </div>
              <div className="mdc-dialog__scrim"></div>
            </div>
          </div>

          <div className="mdc-dialog" role="alertdialog" aria-modal="true" aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content" id="about">
            <div className="mdc-dialog__container">
              <div className="mdc-dialog__surface">
                <h2 className="mdc-dialog__title" id="about-dialog-title">{this.state.text_about_title}</h2>
                <div className="mdc-dialog__content" id="about-dialog-content">
                  {HtmlParse(this.state.text_about_content1)}
                  {HtmlParse(this.state.text_about_content2)}
                  {HtmlParse(this.state.text_about_content3)}
                </div>
                <footer className="mdc-dialog__actions">
                  <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                    <span className="mdc-button__label">{this.state.text_close_button}</span>
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
