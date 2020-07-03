import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Loader from '../UI/Loader/Loader';
import MyAlert from '../UI/Alert/Alert';
import Intro from '../Intro/Intro';
class PersonDetails extends Component {
	state = {
		teacher: null,
		loading: false,
		doneObj: null
	};

	getTeacher = async () => {
		this.setState({ loading: true });
		const teacherId = this.props.match.params.teacherId;
		try {
			const res = await axios.get(`settings/teachers/${teacherId}`);
			if (res.data.teacher.subject.length < 1) {
				const doneObj = {
					message: 'This Teacher has no subject, you should appoint a subject for him',
					type: 'warning'
				};
				this.setState({ doneObj: doneObj });
			}
			this.setState({ teacher: res.data.teacher, loading: false });
		} catch (error) {
			console.log(error);
			this.setState({ loading: false });

			alert('something went wrong, please try again later');
		}
	};

	componentDidMount() {
		this.getTeacher();
	}
	render() {
		let subjectName;
		let category;
		if (this.state.teacher) {
			if (this.state.teacher.subject.length < 1) {
				subjectName = 'Does not have a subject!';
				category = `${this.state.teacher.firstName} ${this.state.teacher.lastName} (${subjectName})`;
			} else {
				subjectName = this.state.teacher.subject[0].name;
				category = `${this.state.teacher.firstName} ${this.state.teacher.lastName} (${subjectName} Teacher)`;
			}
		}
		return (
			<Fragment>
				{this.state.teacher && (
					<div>
						<Intro logo='Person' thisCategory={category} />

						<ul style={{ fontSize: '1.2rem' }}>
							<li>
								<span style={{ fontWeight: 'bold' }}>FirstName</span>: {this.state.teacher.firstName}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>LastName</span>: {this.state.teacher.lastName}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Age</span>: {this.state.teacher.age}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Email</span>: {this.state.teacher.email}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Gender</span>: {this.state.teacher.gender}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Joined-At</span>: {this.state.teacher.joinedAt}
							</li>
							<li>
								<span style={{ fontWeight: 'bold' }}>Salary</span>: ${this.state.teacher.salary}
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

export default PersonDetails;
