import React, { useContext } from 'react';
import { Formik, FormikProps, ErrorMessage } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { SignUpContext } from '../../../../common/contexts/sign-up.context';
import { createUser } from '../../../../actions/user';
import { RegistrWrapper } from './styles';
import validation from './validationSchema';
import PasswordInput from './passwordInput';
import step from '../../constant'

interface IFormikValues {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	repeatPassword: string;
}

interface IPhoneCheckProps {
	onContinue(step: number): void;
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
		onContinue(step.CONGRATULATIONS_STEP);
	};

	return (
		<Formik
			initialValues={InitialValues}
			onSubmit={handleSubmit}
			validationSchema={validation}>
			{({
				values,
				handleChange,
				errors,
				touched,
			}: FormikProps<IFormikValues>) => (
				<RegistrWrapper>
					<TextField
						error={touched.username && errors.username ? true : false}
						label='Username'
						variant='outlined'
						size='medium'
						type='text'
						value={values.username}
						onChange={handleChange}
						name='username'
						placeholder='Type username...'
					/>
					<ErrorMessage name='username' component='span' className='error' />
					<TextField
						error={touched.firstName && errors.firstName ? true : false}
						label='First name'
						variant='outlined'
						size='medium'
						type='text'
						value={values.firstName}
						onChange={handleChange}
						name='firstName'
						placeholder='Type First name...'
					/>
					<ErrorMessage name='firstName' component='span' className='error' />
					<TextField
						error={touched.lastName && errors.lastName ? true : false}
						label='Last name'
						variant='outlined'
						size='medium'
						type='text'
						value={values.lastName}
						onChange={handleChange}
						name='lastName'
						placeholder='Type Last name...'
					/>
					<ErrorMessage name='lastName' component='span' className='error' />
					<TextField
						error={touched.email && errors.email ? true : false}
						label='Email'
						variant='outlined'
						size='medium'
						type='text'
						value={values.email}
						onChange={handleChange}
						name='email'
						placeholder='Type email...'
					/>
					<ErrorMessage name='email' component='span' className='error' />
					<PasswordInput
						id='password'
						name='password'
						placeholder='Type password...'
						value={values.password}
						errors={touched.password && errors ? true : false}
						label='Password'
						width={70}
						handleChange={handleChange}
					/>
					<ErrorMessage name='password' component='span' className='error' />
					<PasswordInput
						id='repeatPassword'
						name='repeatPassword'
						placeholder='Repeat password...'
						value={values.repeatPassword}
						errors={touched.repeatPassword && errors ? true : false}
						label='Repeat password'
						width={130}
						handleChange={handleChange}
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
