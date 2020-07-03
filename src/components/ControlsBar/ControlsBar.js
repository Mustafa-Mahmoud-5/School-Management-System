import React from 'react';
import './ControlsBar.scss';
import { Search, AddCircle } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

/*
Required Props:

	thisCategory
	goToAdd
	adding
*/
function ControlsBar(props) {
	return (
		<div className='bar'>
			<div>
				<TextField
					id='searchInput'
					label={`Search For ${props.thisCategory}`}
					name='searchText'
					onChange={props.searching}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<Search className='search' onClick={props.search} />
							</InputAdornment>
						)
					}}
				/>
			</div>
			<div>
				{props.adding && (
					<IconButton aria-label='delete' size='small' onClick={props.goToAdd}>
						<AddCircle color='primary' className='add' fontSize='large' />
					</IconButton>
				)}
			</div>
		</div>
	);
}

export default ControlsBar;
