import React from 'react';
import Layout from './components/Layout/Layout';
import { Switch, Route } from 'react-router-dom';
// subjects
import Subjects from './components/Elements/Subjects/Subjects';
import AddSubject from './components/Add/AddSubject';
import EditSubject from './components/Edit/EditSubject';
import SubjectDetails from './components/Details/SubjectDetails';
// teachers
import Teachers from './components/Elements/Teachers/Teachers';
import AddTeacher from './components/Add/addTeachers';
import EditTeacher from './components/Edit/EditTeacher';
import PersonDetails from './components/Details/PersonDetails';

// classes
import Classes from './components/Elements/Classes/Classes';
import AddClass from './components/Add/AddClass';
import EditClass from './components/Edit/EditClass';
import ClassDetails from './components/Details/ClassDetails';

// students
import Students from './components/Elements/Students/Students';
import AddStudent from './components/Add/AddStudent';
import EditStudent from './components/Edit/EditStudent';
import StudentDetails from './components/Details/StudentDetails';

// About
import About from './components/About/About';

// NotFound
import NotFound from './components/NotFound/NotFound';
import axios from 'axios';

axios.defaults.baseURL = 'https://school-managment-system-app.herokuapp.com/';

function App() {
	return (
		<div className='App'>
			<Layout>
				<Switch>
					{/* subjects */}
					<Route path='/' exact component={About} />
					<Route path='/Subjects' exact component={Subjects} />
					<Route path='/Subjects/Add' exact component={AddSubject} />
					<Route path='/Subjects/Edit/:subjectId' exact component={EditSubject} />
					<Route path='/Subjects/Details/:subjectId' exact component={SubjectDetails} />
					{/* teachers */}

					<Route path='/Teachers' exact component={Teachers} />
					<Route path='/Teachers/Add' exact component={AddTeacher} />
					<Route path='/Teachers/Edit/:teacherId' exact component={EditTeacher} />
					<Route path='/Teachers/Details/:teacherId' exact component={PersonDetails} />
					{/* classes */}
					<Route path='/Classes' exact component={Classes} />
					<Route path='/Classes/Add' exact component={AddClass} />
					<Route path='/Classes/Edit/:classId' exact component={EditClass} />
					<Route path='/Classes/Details/:classId' exact component={ClassDetails} />
					{/* Students */}
					<Route path='/Students' exact component={Students} />
					<Route path='/Students/Add' exact component={AddStudent} />
					<Route path='/Students/Edit/:studentId' exact component={EditStudent} />
					<Route path='/Students/Details/:studentId' exact component={StudentDetails} />
					{/* unknowen url  */}

					<Route component={NotFound} />
				</Switch>
			</Layout>
		</div>
	);
}

export default App;
