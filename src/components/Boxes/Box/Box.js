import React from 'react';
import './Box.scss';
import { School, Class } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Visibility } from '@material-ui/icons';

function Box(props) {
	return (
		<div className='col-md-4' style={{ marginBottom: '20px' }}>
			<div className='wrap'>
				<div className='box'>
					<div className='goToDetails'>
						<div className='centerIt'>{props.logo === 'School' ? <School /> : <Class />}</div>
						<div>{props.name}</div>
					</div>
					<div className='options'>
						<div>
							{' '}
							<IconButton aria-label='visit' color='primary' onClick={props.goToDetails}>
								<Visibility />
							</IconButton>
						</div>

						<div>
							{' '}
							<IconButton aria-label='edit' onClick={props.goToEdit}>
								<EditIcon />
							</IconButton>
						</div>
						<div>
							{' '}
							<IconButton aria-label='delete' color='secondary' onClick={props.delete}>
								<DeleteIcon />
							</IconButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Box;
