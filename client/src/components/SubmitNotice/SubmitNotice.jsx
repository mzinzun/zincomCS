import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class SubmitNotice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hideMe: true,
			showMe: false
		}
	}
	render() {
		return (
			<>
			<div className = 'subNotice' id = 'subNotice' >
				<h1>Thank You For you Purchase</h1>
				<h3>You will receive a receipt of purchase by email within 15 minutes </h3>
				<Link className = 'btn btn-dark' to = '/home' >OK</Link>
			</div>
			</>
		)
	}
}

export default SubmitNotice;