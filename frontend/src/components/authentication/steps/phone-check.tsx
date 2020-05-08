import React, { useContext } from 'react';
import { Formik, FormikProps } from 'formik';
import { Input, Button } from 'antd';
import { verifyPhone } from '../../../actions/user';
import { SignUpContext } from '../../../common/contexts/sign-up.context';
import { WrappedForm } from '../styles';

interface IFormikValues {
	phone: string;
}

interface IPhoneCheckProps {
	onContinue(): void;
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
			await verifyPhone(values.phone);
			handleUpdateValues(values);
			onContinue();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Formik initialValues={InitialValues} onSubmit={handleSubmit}>
			{({ values, handleChange }: FormikProps<IFormikValues>) => (
				<WrappedForm>
					<Input
						size='large'
						type='text'
						value={values.phone}
						onChange={handleChange}
						name='phone'
						placeholder='Type your phone number here...'
					/>
					<Button size='large' block htmlType='submit'>
						Check phonenumber and continue
					</Button>
				</WrappedForm>
			)}
		</Formik>
	);
};

export default PhoneCheck;
