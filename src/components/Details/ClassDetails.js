import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MyTable from '../Table/MyTable';
import Loader from '../UI/Loader/Loader';
import axios from 'axios';
export default class ClassDetails extends Component {
	state = {
		loading: false,
		classObj: null
	};

	getClass = async () => {
		try {
			this.setState({ loading: true });
			const classId = this.props.match.params.classId;

			const res = await axios.get(`settings/class/${classId}`);
			console.log('SubjectDetails -> getClass -> res', res);
			this.setState({ loading: false, classObj: res.data.class });
		} catch (error) {
			alert(error.response.data.error);
		}
	};

	removeStudentFromClass = async (studentId, studentName) => {
		const classId = this.props.match.params.classId;
		try {
			if (
				window.confirm(`Are you sure you want to remove a student with name ${studentName} from this class ?`)
			) {
				const body = { classId: classId, studentId: studentId };
				await axios.patch(`settings/class/removeStudent`, body);
				this.getClass();
			}
		} catch (error) {
			alert(error.response.data.error);
		}
	};
	componentDidMount() {
		this.getClass();
	}
	render() {
		return (
			<div>
				{this.state.classObj && (
					<div>
						<Intro thisCategory={this.state.classObj.name} logo='Class' />
						{this.state.classObj.realStudents.length > 0 ? (
							<div>
								<h2 style={{ textAlign: 'center' }}>Class Students</h2>
								<MyTable
									removeStudentFromClass={this.removeStudentFromClass}
									removeStudent={true}
									items={this.state.classObj.realStudents}
									heads={[ 'FullName', 'Email', 'Age', 'Gender', 'Joined-At', 'Remove' ]}
									body={[ 'email', 'age', 'gender', 'joinedAt' ]}
								/>
							</div>
						) : (
							<h1 style={{ textAlign: 'center' }}>{`${this.state.classObj
								.name} Class has no students `}</h1>
						)}
					</div>
				)}
				{this.state.loading && <Loader />}
			</div>
		);
	}
}
