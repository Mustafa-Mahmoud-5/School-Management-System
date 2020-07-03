import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Loader.scss';
export default function Loader() {
	return (
		<div id='Loader'>
			<LinearProgress className='AppProgressBar' />
		</div>
	);
}
