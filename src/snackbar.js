// snackbar.js - Snackbar material react component.

import React from 'react';

import "@material/snackbar/dist/mdc.snackbar.css";
import { MDCSnackbar } from '@material/snackbar';

function open_snackbar(ref, id) {
	if (ref) {
		if (ref.current) {
			const element = ref.current.querySelector('#' + id + '-snackbar');
			if (element) {
				const snackbar = new MDCSnackbar(element);
				snackbar.open();
			}
		}

	}
}

class Snackbar extends React.Component {
	render() {
		return (
			<div className="mdc-snackbar" id={this.props.id + '-snackbar'}><div className="mdc-snackbar__surface"><div className="mdc-snackbar__label" role="status" aria-live="polite">{this.props.children}</div></div></div>);
	}
}

export { Snackbar, open_snackbar };
