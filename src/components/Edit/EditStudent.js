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

class EditStudent extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		age: '',
		gender: '',
		loading: false,
		doneObj: null
	};

	getStudent = async () => {
		this.setState({ loading: true });
		const studentId = this.props.match.params.studentId;
		try {
			const res = await axios.get(`settings/student/${studentId}`);
			const student = res.data.student;
			this.setState({
				firstName: student.firstName,
				lastName: student.lastName,
				age: student.age,
				gender: student.gender,
				email: student.email,
				loading: false
			});
		} catch (error) {
			alert(error.response.data.error);
		}
	};
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	submitHandler = async e => {
		this.setState({ loading: true });
		e.preventDefault();

		try {
			const { firstName, lastName, age, gender, email } = this.state;
			const body = {
				firstName: firstName,
				lastName: lastName,
				age: +age,
				gender: gender,
				email: email,
				studentId: this.props.match.params.studentId
			};
			const res = await axios.patch('settings/student/edit', body);
			let doneObj = { message: res.data.message, type: 'success' };
			this.setState({ loading: false, doneObj: doneObj });
		} catch (error) {
			let doneObj = { message: error.response.data.error, type: 'error' };
			this.setState({ loading: false, doneObj: doneObj });
		}
	};

	componentDidMount() {
		this.getStudent();
	}
	render() {
		return (
			<Fragment>
				<Intro thisCategory='Edit Student' logo='People' />
				<form className='addForm' onSubmit={this.submitHandler}>
					<div className='formGroup'>
						<div className='inp'>
							<TextField
								id='outlined-basic'
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
								id='outlined-basic'
								label='LastName'
								variant='outlined'
								style={{ width: '100%' }}
								name='lastName'
								value={this.state.lastName}
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
								value={this.state.email}
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
								value={this.state.age}
								onChange={this.changeHandler}
								required
							/>
						</div>
					</div>
					<div className='formGroup'>
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

export default EditStudent;
