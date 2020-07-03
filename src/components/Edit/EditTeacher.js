import React, { Component, Fragment } from 'react';
import '../Add/Add.scss';
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

export class EditTeacher extends Component {
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

	getTeacher = async () => {
		this.setState({ loading: true });

		let teacherId = this.props.match.params.teacherId;

		try {
			const res = await axios.get(`settings/teachers/${teacherId}`);
			console.log('addTeachers -> getTeacher -> res', res);

			const { firstName, lastName, age, gender, email, subjectId, salary } = res.data.teacher;
			this.setState({
				firstName: firstName,
				lastName: lastName,
				email: email,
				age: +age,
				gender: gender,
				salary: +salary,
				subjectId: subjectId,
				loading: false
			});
		} catch (error) {
			this.setState({ loading: false });
		}
	};

	getSubjectsForSelecting = async () => {
		try {
			const res = await axios.get('settings/subjects');
			console.log(res.data.subjects);
			this.setState({
				subjects: res.data.subjects
			});
		} catch (error) {
			console.log(error);
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ doneObj: doneObj });
		}
	};

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = async e => {
		e.preventDefault();
		this.setState({ loading: true });
		let teacherId = this.props.match.params.teacherId;

		try {
			const { firstName, lastName, age, gender, email, salary, subjectId } = this.state;
			const body = {
				firstName: firstName,
				lastName: lastName,
				age: +age,
				gender: gender,
				email: email,
				salary: +salary,
				subjectId: subjectId,
				teacherId: teacherId
			};
			console.log('EditTeacher -> body', body);
			const res = await axios.patch('settings/teacher/edit', body);
			let doneObj = { message: res.data.message, type: 'success' };
			this.setState({ loading: false, doneObj: doneObj });
		} catch (error) {
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ loading: false, doneObj: doneObj });
		}
	};
	componentDidMount() {
		this.getTeacher();
		this.getSubjectsForSelecting();
	}
	render() {
		return (
			<Fragment>
				<Intro thisCategory='Edit Teacher' logo='Person' />
				<form className='addForm' onSubmit={this.submitHandler}>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic1'
								label='FirstName'
								variant='outlined'
								style={{ width: '100%' }}
								name='firstName'
								value={this.state.firstName}
								onChange={this.changeHandler}
								required
							/>
						</div>
						<div className='inp'>
							<TextField
								id='outlined-basic2'
								label='LastName'
								variant='outlined'
								style={{ width: '100%' }}
								value={this.state.lastName}
								name='lastName'
								onChange={this.changeHandler}
								required
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic3'
								label='Email'
								variant='outlined'
								style={{ width: '100%' }}
								type='email'
								value={this.state.email}
								name='email'
								onChange={this.changeHandler}
								required
							/>
						</div>
						<div className='inp'>
							<TextField
								id='outlined-basic4'
								label='Age'
								type='number'
								variant='outlined'
								style={{ width: '100%' }}
								value={this.state.age}
								name='age'
								onChange={this.changeHandler}
								required
							/>
						</div>
					</div>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic5'
								label='Salary'
								variant='outlined'
								style={{ width: '100%' }}
								name='salary'
								value={this.state.salary}
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
									labelId='demo-simple-select-filled-label-5'
									id='demo-simple-select-filled-3'
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
									id='demo-simple-select-filled2'
									label='Subject'
									name='subjectId'
									value={this.state.subjectId}
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

export default EditTeacher;
