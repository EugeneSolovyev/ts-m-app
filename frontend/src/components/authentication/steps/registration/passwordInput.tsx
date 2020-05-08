import React from 'react';
import {
	InputAdornment,
	OutlinedInput,
	FormControl,
	IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { connect } from 'formik';

const PasswordInput = (props: any) => {
	const [visibility, setVisibility] = React.useState(false);

	const visibilityToggle = () => {
		setVisibility(!visibility);
	};

	return (
		<FormControl variant='outlined' size='medium'>
			<OutlinedInput
				value={props.value}
				type={visibility ? 'text' : 'password'}
				onChange={props.formik.handleChange}
				name={props.name}
				placeholder={props.placeholder}
				endAdornment={
					<InputAdornment position='end'>
						<IconButton onClick={visibilityToggle}>
							{visibility ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormControl>
	);
};

export default connect(PasswordInput);
