import React, { createContext, useState } from 'react';
import { keys } from 'ramda';

interface ISignUpProviderProps {
	children: React.ReactNode;
}

const INITIAL_VALUES = {
	phone: '',
	username: '',
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	repeatPassword: '',
};

export const SignUpContext = createContext<any>(INITIAL_VALUES);

interface formValues {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	repeatPassword: string;
	phone: string;
}

export const SignUpProvider = ({ children }: ISignUpProviderProps) => {
	const [values, setValues] = useState<formValues>({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		repeatPassword: '',
		phone: '',
	});

	const handleUpdateValues = (values: formValues) => {
		keys(values || {}).forEach((key) => {
			setValues((prevValuesState) => ({
				...prevValuesState,
				[key]: values[key],
			}));
		});
	};

	return (
		<SignUpContext.Provider value={{ values, setValues, handleUpdateValues }}>
			{children}
		</SignUpContext.Provider>
	);
};
