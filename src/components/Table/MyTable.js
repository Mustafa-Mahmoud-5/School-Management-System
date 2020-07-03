import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Edit, Delete, Person, Visibility } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { Add } from '@material-ui/icons';

/*
	props:
		options >>> this table will have options or not
		items >>> array of data
		heads >>> array of props we want to put in the head of the table
		body >>> array of the props to display in the body rows
*/
const useStyles = makeStyles({
	table: {
		minWidth: 650,
		overflowX: 'scroll'
	},
	bold: {
		fontWeight: 'bold',
		textTransform: 'capitalize'
	}
});
function MyTable(props) {
	const classes = useStyles();
	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='center'>#</TableCell>
						{/* heads */}
						{props.heads.map(head => (
							<TableCell key={head} align='center'>
								{head}
							</TableCell>
						))}
						{/* custom heads */}
						{props.students && <TableCell align='center'>Class</TableCell>}
						{props.options && <TableCell align='center'>options</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{/* table body items */}
					{props.items.map(item => {
						return (
							<TableRow key={item._id.toString()}>
								<TableCell align='center'>
									<Person />
								</TableCell>
								{/* fullName */}
								<TableCell align='center' component='th' scope='row' className={classes.bold}>
									{item.firstName + ' ' + item.lastName}
								</TableCell>
								{/* body cells */}
								{props.body.map(bodyCell => {
									if (bodyCell === 'joinedAt') {
										const joinedDate = item[bodyCell];
										return (
											<TableCell align='center' key={bodyCell}>
												{joinedDate.toString()}
											</TableCell>
										);
									}
									return (
										<TableCell align='center' key={bodyCell}>
											{item[bodyCell]}
										</TableCell>
									);
								})}
								{props.removeStudent && (
									<TableCell align='center'>
										<IconButton
											aria-label='delete'
											size='small'
											onClick={() =>
												props.removeStudentFromClass(
													item._id.toString(),
													`"${item.firstName} ${item.lastName}"`
												)}
										>
											<Delete color='secondary' fontSize='small' />
										</IconButton>
									</TableCell>
								)}

								{/* Class */}
								{props.students ? item.class.length > 0 ? (
									<TableCell align='center'>{item.class[0].name}</TableCell>
								) : (
									// adding student to class form
									<TableCell align='center'>
										<form onSubmit={e => props.addStudentToClass(e, item._id.toString())}>
											{' '}
											<FormControl className={classes.formControl}>
												{/* <InputLabel id='demo-simple-select-label'>Age</InputLabel> */}
												<Select
													labelId='demo-simple-select-label'
													id='demo-simple-select'
													required
													onChange={props.classChangeHandler}
												>
													{/* select box */}
													{props.classes.map((cls, i) => (
														<MenuItem key={i} value={cls._id.toString()}>
															{cls.name}
														</MenuItem>
													))}
												</Select>
											</FormControl>
											<IconButton aria-label='delete' type='submit'>
												<Add fontSize='small' />
											</IconButton>
										</form>
									</TableCell>
								) : null}

								{/* options */}
								{props.options && (
									<TableCell align='center' id='tableOptions'>
										{/* if we need to display the view item */}
										{props.view && (
											<IconButton
												aria-label='view'
												size='small'
												onClick={() => props.goToDetails(item._id.toString())}
											>
												<Visibility color='primary' fontSize='small' />
											</IconButton>
										)}
										<IconButton
											aria-label='edit'
											size='small'
											onClick={() => props.goToEdit(item._id.toString())}
										>
											<Edit fontSize='small' />
										</IconButton>
										<IconButton
											aria-label='delete'
											size='small'
											onClick={() =>
												props.deleteItem(
													item._id.toString(),
													`${item.firstName} ${item.lastName}`
												)}
										>
											<Delete color='secondary' fontSize='small' />
										</IconButton>
									</TableCell>
								)}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default MyTable;
