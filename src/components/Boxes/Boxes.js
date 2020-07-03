import React, { Fragment } from 'react';
import Box from '../Boxes/Box/Box';
import Intro from '../Intro/Intro';
import ControlsBar from '../ControlsBar/ControlsBar';
import Loader from '../UI/Loader/Loader';

/**
 * Required Props:
 * 	loading
 * 	logo
 * 	thisCategory
 * 	items
 * 	goToAdd
 * 	goToEdit
 * 	delete
 *	goToDetails
 */
function Boxes(props) {
	return (
		<Fragment>
			{props.loading ? (
				<Loader />
			) : (
				<div>
					<Intro thisCategory={props.thisCategory} logo={props.logo} />
					<ControlsBar
						search={props.search}
						searching={props.searching}
						thisCategory={props.thisCategory}
						goToAdd={props.goToAdd}
						adding={true}
					/>
					<div className='row'>
						{props.items.map(item => {
							return (
								<Box
									name={item.name}
									key={item._id.toString()}
									logo={props.logo}
									goToEdit={() => props.goToEdit(item._id.toString())}
									delete={() => props.delete(item._id.toString(), item.name)}
									goToDetails={() => props.goToDetails(item._id.toString())}
								/>
							);
						})}
					</div>
				</div>
			)}
		</Fragment>
	);
}

export default Boxes;
