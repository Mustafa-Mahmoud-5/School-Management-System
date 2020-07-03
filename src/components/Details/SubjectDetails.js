import React, { Component } from 'react';
import Intro from '../Intro/Intro';
import MyTable from '../Table/MyTable';
import Loader from '../UI/Loader/Loader';
import axios from 'axios';

export class SubjectDetails extends Component {
	state = {
		loading: false,
		subject: null
	};

	getSubject = async () => {
		try {
			this.setState({ loading: true });
			const subjectId = this.props.match.params.subjectId;
			console.log('SubjectDetails -> getSubject -> subjectId', subjectId);

			const res = await axios.get(`settings/subject/${subjectId}`);
			console.log('SubjectDetails -> getSubject -> res', res);
			this.setState({ loading: false, subject: res.data.subject });
		} catch (error) {
			console.log(error);
		}
	};

	componentDidMount() {
		console.log('workinggg');

		this.getSubject();
	}
	render() {
		return (
			<div>
				{this.state.subject && (
					<div>
						<Intro thisCategory={this.state.subject.name} logo='School' />

						{this.state.subject.realTeachers.length > 0 ? (
							<div>
								<h2 style={{ textAlign: 'center' }}>Subject Teachers</h2>
								<MyTable
									items={this.state.subject.realTeachers}
									heads={[ 'FullName', 'Email', 'Age', 'Gender', 'Salary', 'Joined-At' ]}
									body={[ 'email', 'age', 'gender', 'salary', 'joinedAt' ]}
								/>
							</div>
						) : (
							<h1 style={{ textAlign: 'center' }}>{`${this.state.subject
								.name} subject has no teachers `}</h1>
						)}
					</div>
				)}
				{this.state.loading && <Loader />}
			</div>
		);
	}
}

export default SubjectDetails;
