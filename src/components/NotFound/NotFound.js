import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
function NotFound() {
	return (
		<Fragment>
			<h1 style={{ textAlign: 'center', color: 'red' }}>
				404, Page Not Found, this url is not a part of our app.
			</h1>
			<div style={{ textAlign: 'center' }}>
				<Link>Back To Subjects</Link>
			</div>
		</Fragment>
	);
}

export default NotFound;
