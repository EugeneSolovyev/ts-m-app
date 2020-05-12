import * as Yup from 'yup';

const validationSchema = Yup.object({
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
});

export default validationSchema;
