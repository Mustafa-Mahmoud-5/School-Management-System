import React from 'react';
import './About.scss';
function About() {
	return (
		<div id='About'>
			<h1 style={{ textAlign: 'center' }}>About The Application</h1>
			<div className='row'>
				<div className='col-md-6'>
					<p>
						This is an open source app which is built for showing some programming skills purpose, for sure
						i could`ve created a system that enables any username and password to login but there`s no need
						for this
					</p>
					<p>
						This app has no authentication (signup/login) system which means that any one can start using,
						adding into, removing from, and editing to this system{' '}
					</p>
				</div>
				<div className='col-md-6'>
					<p>
						This is a school management system in which you can manage the school subjects, teachers,
						students and classes
					</p>
					<p>Start using the app, navigate from the navbar at the right side, happy hacking :)</p>
				</div>
			</div>
		</div>
	);
}

export default About;
