import React, { useContext } from 'react';
import { Formik, FormikProps, ErrorMessage } from 'formik';
import {
	Button,
	TextField,
	InputAdornment,
	OutlinedInput,
	FormControl,
	IconButton,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { SignUpContext } from '../../../../common/contexts/sign-up.context';
import { createUser } from '../../../../actions/user';
import { RegistrWrapper } from './styles';
import * as Yup from 'yup';

interface IFormikValues {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	repeatPassword: string;
}

interface IPhoneCheckProps {
	onContinue(): void;
}

const Registration = ({ onContinue }: IPhoneCheckProps) => {
	const {
		phone,
		username,
		setUsername,
		firstName,
		setFirstName,
		lastName,
		setLastName,
		email,
		setEmail,
		password,
		setPassword,
		repeatPassword,
		setRepeatPassword,
	} = useContext(SignUpContext);

	const [visibility, setVisibility] = React.useState(false);

	const visibilityToggle = () => {
		setVisibility(!visibility);
	};

	const InitialValues: IFormikValues = {
		username,
		firstName,
		lastName,
		email,
		password,
		repeatPassword,
	};

	const handleSubmit = async (values: IFormikValues) => {
		await createUser({ ...values, phone });
		setUsername(values.username);
		setFirstName(values.firstName);
		setLastName(values.lastName);
		setEmail(values.email);
		setPassword(values.password);
		setRepeatPassword(values.repeatPassword);
		onContinue();
	};

	return (
		<Formik
			initialValues={InitialValues}
			onSubmit={handleSubmit}
			validationSchema={Yup.object({
				username: Yup.string().required('Required'),
				firstName: Yup.string().required('Required'),
				lastName: Yup.string().required('Required'),
				email: Yup.string().email('Invail email adress').required('Required'),
				password: Yup.string()
					.required('Required')
					.max(32, 'Must be 32 characters or less')
					.min(8, 'Must be 8 characters or more'),
				repeatPassword: Yup.string()
					.required('Required')
					.oneOf([Yup.ref('password'), null], 'Passwords must match'),
			})}>
			{({ values, handleChange }: FormikProps<IFormikValues>) => (
				<RegistrWrapper>
					<TextField
						variant='outlined'
						size='medium'
						type='text'
						value={values.username}
						onChange={handleChange}
						name='username'
						placeholder='Username'
					/>
					<ErrorMessage name='username' component='span' className='error' />
					<TextField
						variant='outlined'
						size='medium'
						type='text'
						value={values.firstName}
						onChange={handleChange}
						name='firstName'
						placeholder='First name'
					/>
					<ErrorMessage name='firstName' component='span' className='error' />
					<TextField
						variant='outlined'
						size='medium'
						type='text'
						value={values.lastName}
						onChange={handleChange}
						name='lastName'
						placeholder='Last name'
					/>
					<ErrorMessage name='lastName' component='span' className='error' />
					<TextField
						variant='outlined'
						size='medium'
						type='text'
						value={values.email}
						onChange={handleChange}
						name='email'
						placeholder='Email'
					/>
					<ErrorMessage name='email' component='span' className='error' />
					<FormControl variant='outlined' size='medium'>
						<OutlinedInput
							value={values.password}
							type={visibility ? 'text' : 'password'}
							onChange={handleChange}
							name='password'
							placeholder='Password'
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={visibilityToggle}>
										{visibility ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<ErrorMessage name='password' component='span' className='error' />
					<FormControl variant='outlined' size='medium'>
						<OutlinedInput
							value={values.repeatPassword}
							type={visibility ? 'text' : 'password'}
							onChange={handleChange}
							name='repeatPassword'
							placeholder='Repeat password'
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={visibilityToggle}>
										{visibility ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<ErrorMessage
						name='repeatPassword'
						component='span'
						className='error'
					/>
					<Button
						variant='outlined'
						size='medium'
						type='submit'
						color='primary'>
						Register and continue
					</Button>
				</RegistrWrapper>
			)}
		</Formik>
	);
};

export default Registration;
