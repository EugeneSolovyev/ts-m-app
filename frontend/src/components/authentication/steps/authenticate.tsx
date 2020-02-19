import React from 'react'
import { Formik, FormikProps } from 'formik';
import { useHistory } from "react-router-dom";
import { bindActionCreators } from 'redux';
import { Input, Button } from 'antd'
import { connect } from '../../../helpers/connect';
import { signIn } from '../../../actions/user'
import { HOME_PATH } from '../../../router'
import { WrappedForm } from '../styles'

interface IFormikValues {
    username: string;
    password: string;
}

const Authenticate = ({ signIn, ...props }: any) => {
    const InitialValues: IFormikValues = {
        username: '',
        password: ''
    }
    const { push } = useHistory()

    const handleSubmit = async (values: IFormikValues) => {
        await signIn(values)
        push(HOME_PATH)
    }

    return (
        <Formik
            initialValues={InitialValues}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange }: FormikProps<IFormikValues>) => (
                <WrappedForm>
                    <Input size="large" type="text" value={values.username} name="username" onChange={handleChange} placeholder="Phonenumber" />
                    <Input.Password size="large" value={values.password} name="password" onChange={handleChange} placeholder="Password" />
                    <Button size="large" block htmlType="submit">Login</Button>
                </WrappedForm>
            )}
        </Formik>
    )
}

export default (connect(
    null,
    (dispatch) => bindActionCreators({ signIn }, dispatch)
) as any)(Authenticate)