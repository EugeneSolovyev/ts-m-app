import styled from 'styled-components';
import { Form } from 'formik';

export const RegistrWrapper = styled(Form)`
	.error {
		color: red;
		margin-left: 0.5rem;
	}
	.MuiButtonBase-outlined {
		margin-top: 1rem;
	}
	.MuiFormControl-root {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		width: 100%;
	}
`;
