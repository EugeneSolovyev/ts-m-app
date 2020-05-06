import React, { useContext } from 'react';
import { Formik, FormikProps, ErrorMessage } from 'formik';
import { verifyPhone } from '../../../actions/user';
import { SignUpContext } from '../../../common/contexts/sign-up.context';
import { WrappedForm } from '../styles';
import { Button, TextField } from '@material-ui/core';
import * as Yup from 'yup';

interface IFormikValues {
    phone: string;
}

interface IPhoneCheckProps {
    onContinue(): void;
    onAuthenticate(): void;
}

const PhoneCheck = ({ onContinue, onAuthenticate }: IPhoneCheckProps) => {
    const { phone, setPhone } = useContext(SignUpContext)
    const InitialValues: IFormikValues = {
        phone
    }

    const phoneRegExp: any = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
    const SignupSchema = Yup.object().shape({
        phone: Yup.string()
          .matches(phoneRegExp, 'Phone number is not valid')
          .required('Required'),
    });

    const handleSubmit = async (values: IFormikValues) => {
        try {
            console.log(values.phone)
            await verifyPhone(values.phone)
            setPhone(values.phone)
            onAuthenticate()
            // onContinue()
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <Formik
            initialValues={InitialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
        >
            {({ values, handleChange, errors }: FormikProps<IFormikValues>) => (
                <WrappedForm>
                    <TextField error={errors.phone? true : false} fullWidth value={values.phone} onChange={handleChange} name="phone" label="Phone" variant="outlined" placeholder="Type your phone number here..."/>
                    <ErrorMessage name="phone" component="div" className="error" />
                    <Button fullWidth type="submit" variant="outlined" color="primary">Check phone number and continue</Button>
                </WrappedForm>
            )}
        </Formik>
    )
}

export default PhoneCheck;