import React, { useContext } from 'react';
import { Formik, FormikProps, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { SignUpContext } from '../../../../common/contexts/sign-up.context';
import { createUser } from '../../../../actions/user';
import { RegistrWrapper } from './styles';
import validation from './validationSchema';
import PasswordInput from './passwordInput';

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
		values: {
			phone,
			username,
			firstName,
			lastName,
			email,
			password,
			repeatPassword,
		},
		handleUpdateValues,
	} = useContext(SignUpContext);

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
		handleUpdateValues(values);
		onContinue();
	};

	return (
		<Formik
			initialValues={InitialValues}
			onSubmit={handleSubmit}
			validationSchema={validation}>
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
					<PasswordInput
						name='password'
						placeholder='Password'
						value={values.password}
					/>
					<ErrorMessage name='password' component='span' className='error' />
					<PasswordInput
						name='repeatPassword'
						placeholder='Repeat password'
						value={values.repeatPassword}
					/>
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
