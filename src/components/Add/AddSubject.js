import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Intro from '../Intro/Intro';
import axios from 'axios';
import { Button } from '@material-ui/core';
import MyAlert from '../UI/Alert/Alert';
import Loader from '../UI/Loader/Loader';
export default class AddSubject extends Component {
	state = {
		name: '',
		loading: false,
		doneObj: null
	};

	writeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	addSubjectHandler = async e => {
		e.preventDefault();
		this.setState({ loading: true });
		try {
			const addingResult = await axios.post('settings/subjects', { name: this.state.name });
			console.log('AddSubject -> addingResult', addingResult);
			let doneObj = { message: addingResult.data.message, type: 'success' };

			this.setState({ loading: false, doneObj: doneObj });
		} catch (error) {
			console.log(error.response.data.error);
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ loading: false, doneObj: doneObj });
		}
	};
	render() {
		return (
			<Fragment>
				<Intro logo='School' thisCategory='Add Subject' />
				<form onSubmit={this.addSubjectHandler}>
					<div className='addForm'>
						<TextField
							id='outlined-basic'
							label='Subject Name'
							variant='outlined'
							name='name'
							onChange={this.writeHandler}
							style={{ width: '100%' }}
							required
						/>
						<br />
						<br />
						<Button variant='contained' color='primary' type='submit'>
							Submit
						</Button>
						{this.state.loading && <Loader />}
						<br />
						<br />
						{this.state.doneObj && (
							<MyAlert message={this.state.doneObj.message} type={this.state.doneObj.type} />
						)}
					</div>
				</form>
			</Fragment>
		);
	}
}
