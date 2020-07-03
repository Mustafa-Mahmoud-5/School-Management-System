import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Boxes from '../../Boxes/Boxes';
export class Subjects extends Component {
	state = {
		loading: false,
		subjects: [],
		searchText: ''
	};
	getSubjects = async () => {
		this.setState({ loading: true });
		try {
			const subjects = await axios.get('settings/subjects');
			console.log('Subjects -> getSubjects -> subjects', subjects);

			this.setState({ subjects: subjects.data.subjects, loading: false });
		} catch (error) {
			console.error(error);
			this.setState({ loading: false });
		}
	};
	componentDidMount() {
		this.getSubjects();
	}

	goToAddSubjects = () => {
		this.props.history.push('/Subjects/Add');
	};

	goToEditSubject = subjectId => {
		console.log('Subjects -> subjectId', subjectId, typeof subjectId);

		this.props.history.push(`/Subjects/Edit/${subjectId}`);
	};

	goToDetails = subjectId => {
		this.props.history.push(`/Subjects/Details/${subjectId}`);
	};
	deleteSubject = async (subjectId, subjectName) => {
		if (window.confirm(`Do you want to delete a subject with name ${subjectName}`)) {
			try {
				await axios.delete(`settings/subjects/delete/${subjectId.toString()}`);
				this.getSubjects();
			} catch (error) {
				console.log(error);
			}
		}
	};

	searching = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	search = async () => {
		if (this.state.searchText === '') return alert('Please insert something');
		this.setState({ loading: true });
		try {
			const res = await axios.get(`settings/subjects/search/${this.state.searchText}`);
			this.setState({ loading: false });
			if (res.data.subjects.length < 1) {
				return alert('Subjects Not Found!');
			}
			this.setState({ subjects: res.data.subjects });
		} catch (error) {
			alert(error.response.data.error);
		}
	};
	render() {
		return (
			<Fragment>
				<Boxes
					searching={this.searching}
					search={this.search}
					items={this.state.subjects}
					loading={this.state.loading}
					logo='School'
					thisCategory='Subjects'
					goToAdd={this.goToAddSubjects}
					goToEdit={this.goToEditSubject}
					delete={this.deleteSubject}
					goToDetails={this.goToDetails}
				/>
			</Fragment>
		);
	}
}

export default Subjects;
