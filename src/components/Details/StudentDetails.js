import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Loader from '../UI/Loader/Loader';
import MyAlert from '../UI/Alert/Alert';
import Intro from '../Intro/Intro';
class StudentDetails extends Component {
	state = {
		student: null,
		loading: false,
		doneObj: null
	};

	getStudent = async () => {
		this.setState({ loading: true });
		const studentId = this.props.match.params.studentId;
		try {
			const res = await axios.get(`settings/student/${studentId}`);
			if (res.data.student.class.length < 1) {
				const doneObj = {
					message: 'This Student is not in class, you should appoint a class for him',
					type: 'warning'
				};
				this.setState({ doneObj: doneObj });
			}
			this.setState({ student: res.data.student, loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });

			alert('something went wrong, please try again later');
		}
	};

	componentDidMount() {
		this.getStudent();
	}
	render() {
		let studentName;
		let category;
		if (this.state.student) {
			if (this.state.student.class.length < 1) {
				studentName = 'Does not have a class!';
				category = `${this.state.student.firstName} ${this.state.student.lastName} (${studentName})`;
			} else {
				studentName = this.state.student.class[0].name;
				category = `${this.state.student.firstName} ${this.state.student.lastName} (${studentName} Student)`;
			}
		}
		return (
			<Fragment>
				{this.state.student && (
					<div>
						<Intro logo='Person' thisCategory={category} />

						<ul style={{ fontSize: '1.2rem' }}>
							<li>
								<span style={{ fontWeight: 'bold' }}>FirstName</span>: {this.state.student.firstName}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>LastName</span>: {this.state.student.lastName}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Age</span>: {this.state.student.age}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Email</span>: {this.state.student.email}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Gender</span>: {this.state.student.gender}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Joined-At</span>: {this.state.student.joinedAt}
							</li>
						</ul>
					</div>
				)}
				{this.state.doneObj && <MyAlert message={this.state.doneObj.message} type={this.state.doneObj.type} />}
				{this.state.loading && <Loader />}
			</Fragment>
		);
	}
}

export default StudentDetails;
