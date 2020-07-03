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

	getSubject = async e => {
		const subjectId = this.props.match.params.subjectId;
		console.log('AddSubject -> subjectId', subjectId, typeof subjectId);

		this.setState({ loading: true });
		try {
			const subject = await axios.get(`settings/subject/${subjectId}`);
			console.log('AddSubject -> subject', subject);
			this.setState({ loading: false, name: subject.data.subject.name });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });
		}
	};

	writeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	editSubjectHandler = async e => {
		e.preventDefault();
		this.setState({ loading: true });
		try {
			const addingResult = await axios.patch('settings/subjects/edit', {
				newName: this.state.name,
				subjectId: this.props.match.params.subjectId
			});
			let doneObj = { message: addingResult.data.message, type: 'success' };

			this.setState({ loading: false, doneObj: doneObj });
		} catch (error) {
			console.log(error.response.data.error);
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ loading: false, doneObj: doneObj });
		}
	};

	componentDidMount() {
		this.getSubject();
	}
	render() {
		return (
			<Fragment>
				<Intro logo='School' thisCategory='Edit Subject' />
				<form onSubmit={this.editSubjectHandler}>
					<div className='editForm'>
						<TextField
							id='outlined-basic'
							label='Subject Name'
							variant='outlined'
							name='name'
							onChange={this.writeHandler}
							value={this.state.name}
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
