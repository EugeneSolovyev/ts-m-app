import React, { useContext } from 'react'
import { Formik, FormikProps } from 'formik';
import { Input, Button } from 'antd'
import { SignUpContext } from '../../../common/contexts/sign-up.context'
import { createUser } from '../../../actions/user'
import { WrappedForm } from '../styles'

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
    } = useContext(SignUpContext)

    const InitialValues: IFormikValues = {
        username,
        firstName,
        lastName,
        email,
        password,
        repeatPassword,
    }

    const handleSubmit = async (values: IFormikValues) => {
        await createUser({...values, phone})
        setUsername(values.username)
        setFirstName(values.firstName)
        setLastName(values.lastName)
        setEmail(values.email)
        setPassword(values.password)
        setRepeatPassword(values.repeatPassword)
        onContinue()
    }

    return (
        <Formik
            initialValues={InitialValues}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange }: FormikProps<IFormikValues>) => (
                <WrappedForm>
                    <Input size="large" type="text" value={values.username} onChange={handleChange} name="username" placeholder="Username" />
                    <Input size="large" type="text" value={values.firstName} onChange={handleChange} name="firstName" placeholder="First name" />
                    <Input size="large" type="text" value={values.lastName} onChange={handleChange} name="lastName" placeholder="Last name" />
                    <Input size="large" type="text" value={values.email} onChange={handleChange} name="email" placeholder="Email" />
                    <Input.Password size="large" value={values.password} onChange={handleChange} name="password" placeholder="Password" />
                    <Input.Password size="large" value={values.repeatPassword} onChange={handleChange} name="repeatPassword" placeholder="Repeat password" />
                    <Button size="large" block htmlType="submit">Register and continue</Button>
                </WrappedForm>
            )}
        </Formik>
    )
}

export default Registration