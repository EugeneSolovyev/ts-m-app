import React, { useContext } from 'react';
import { Formik, FormikProps, ErrorMessage } from 'formik';
import { verifyPhone } from '../../../actions/user';
import { SignUpContext } from '../../../common/contexts/sign-up.context';
import { WrappedForm } from '../styles';
import { Button, TextField } from '@material-ui/core';
import SignupSchema from '../../../validation-schemas/index';
import step from '../constant';

interface IFormikValues {
	phone: string;
}

interface IPhoneCheckProps {
	onContinue(): void;
	onContinue(step?: number): void;
}

const PhoneCheck = ({ onContinue }: IPhoneCheckProps) => {
	const {
		values: { phone },
		handleUpdateValues,
	} = useContext(SignUpContext);
	const InitialValues: IFormikValues = {
		phone,
	};

	const handleSubmit = async (values: IFormikValues) => {
		try {
			const response = await verifyPhone(values.phone);
			handleUpdateValues(values);
			if (response) {
				onContinue(step.AUTHENTICATE_STEP);
			} else {
				handleUpdateValues(values);
				onContinue();
			}
		} catch (error) {}
	};

	return (
		<Formik
			initialValues={InitialValues}
			onSubmit={handleSubmit}
			validationSchema={SignupSchema}>
			{({ values, handleChange, errors }: FormikProps<IFormikValues>) => (
				<WrappedForm>
					<TextField
						error={errors.phone ? true : false}
						fullWidth
						value={values.phone}
						onChange={handleChange}
						name='phone'
						label='Phone'
						variant='outlined'
						placeholder='Type your phone number here...'
					/>
					<ErrorMessage name='phone' component='div' className='error' />
					<Button fullWidth type='submit' variant='outlined' color='primary'>
						Check phone number and continue
					</Button>
				</WrappedForm>
			)}
		</Formik>
	);
};

export default PhoneCheck;
