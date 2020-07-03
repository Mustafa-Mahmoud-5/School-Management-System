import React, { Component, Fragment } from 'react';
import './Add.scss';
import TextField from '@material-ui/core/TextField';
import Intro from '../Intro/Intro';
import axios from 'axios';
import { Button } from '@material-ui/core';
import MyAlert from '../UI/Alert/Alert';
import Loader from '../UI/Loader/Loader';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export class AddTeacher extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		age: '',
		gender: '',
		salary: '',
		subjectId: '',
		loading: false,
		doneObj: null,
		subjects: null
	};

	getSubjectsForSelecting = async () => {
		try {
			this.setState({ loading: true });
			const res = await axios.get('settings/subjects');
			console.log(res.data.subjects);
			this.setState({
				loading: false,
				subjects: res.data.subjects
				// subjectId: res.data.subjects[0]._id.toString()
			});
		} catch (error) {
			console.log(error);
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ loading: false, doneObj: doneObj });
		}
	};

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = async e => {
		this.setState({ loading: true });
		e.preventDefault();

		try {
			const { firstName, lastName, age, gender, email, salary, subjectId } = this.state;
			const body = {
				firstName: firstName,
				lastName: lastName,
				age: +age,
				gender: gender,
				email: email,
				salary: +salary,
				subjectId: subjectId
			};
			console.log('addTeachers -> body', body);
			const res = await axios.post('settings/teachers', body);
			let doneObj = { message: res.data.message, type: 'success' };
			this.setState({ loading: false, doneObj: doneObj });
		} catch (error) {
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ loading: false, doneObj: doneObj });
		}
	};
	componentDidMount() {
		this.getSubjectsForSelecting();
	}
	render() {
		return (
			<Fragment>
				<Intro thisCategory='Add Teacher' logo='Person' />
				<form className='addForm' onSubmit={this.submitHandler}>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic'
								label='FirstName'
								variant='outlined'
								style={{ width: '100%' }}
								name='firstName'
								onChange={this.changeHandler}
								required
							/>
						</div>
						<div className='inp'>
							<TextField
								id='outlined-basic'
								label='LastName'
								variant='outlined'
								style={{ width: '100%' }}
								name='lastName'
								onChange={this.changeHandler}
								required
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic'
								label='Email'
								variant='outlined'
								style={{ width: '100%' }}
								type='email'
								name='email'
								onChange={this.changeHandler}
								required
							/>
						</div>
						<div className='inp'>
							<TextField
								id='outlined-basic'
								label='Age'
								type='number'
								variant='outlined'
								style={{ width: '100%' }}
								name='age'
								onChange={this.changeHandler}
								required
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic'
								label='Salary'
								variant='outlined'
								style={{ width: '100%' }}
								name='salary'
								type='number'
								onChange={this.changeHandler}
								required
							/>
						</div>
						<div className='inp'>
							<FormControl variant='outlined' style={{ width: '100%' }}>
								{' '}
								<InputLabel id='demo-simple-select-filled-label-2'>Gender</InputLabel>
								<Select
									labelId='demo-simple-select-filled-label-2'
									id='demo-simple-select-filled-2'
									label='Gender'
									name='gender'
									value={this.state.gender}
									onChange={this.changeHandler}
									required
								>
									<MenuItem value='male'>Male</MenuItem>
									<MenuItem value='female'>Female</MenuItem>
								</Select>
							</FormControl>
						</div>

						{/* subject */}
					</div>
					<div className='formGroup'>
						<div className='inp'>
							<FormControl variant='outlined' style={{ width: '100%' }}>
								{' '}
								<InputLabel id='demo-simple-select-filled-label'>Subject</InputLabel>
								<Select
									labelId='demo-simple-select-filled-label'
									id='demo-simple-select-filled'
									label='Subject'
									name='subjectId'
									// value={this.state.subject}
									onChange={this.changeHandler}
									required
								>
									{this.state.subjects &&
										this.state.subjects.map(subject => (
											<MenuItem key={subject._id.toString()} value={subject._id.toString()}>
												{subject.name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</div>
					</div>
					<Button color='primary' type='submit' variant='contained'>
						Submit
					</Button>
				</form>

				<br />
				{this.state.loading && <Loader />}
				{this.state.doneObj && <MyAlert message={this.state.doneObj.message} type={this.state.doneObj.type} />}
			</Fragment>
		);
	}
}

export default AddTeacher;
