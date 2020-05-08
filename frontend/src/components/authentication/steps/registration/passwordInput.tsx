import React from 'react';
import {
	InputAdornment,
	OutlinedInput,
	FormControl,
	IconButton,
	InputLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { connect } from 'formik';

interface passwordInputProps {
	id: string;
	label: any;
	width: any;
	errors: any;
	value: any;
	name: string;
	placeholder: string;
	handleChange: any;
}

const PasswordInput = ({
	id,
	label,
	width,
	errors,
	value,
	name,
	placeholder,
	handleChange,
}: passwordInputProps) => {
	const [visibility, setVisibility] = React.useState(false);

	const visibilityToggle = () => {
		setVisibility(!visibility);
	};

	return (
		<FormControl variant='outlined' size='medium'>
			<InputLabel htmlFor={id}>{label}</InputLabel>
			<OutlinedInput
				id={id}
				labelWidth={width}
				error={errors}
				value={value}
				type={visibility ? 'text' : 'password'}
				onChange={handleChange}
				name={name}
				placeholder={placeholder}
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
