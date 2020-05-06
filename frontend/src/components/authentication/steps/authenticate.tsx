import React, {useState} from 'react'
import {Formik, FormikProps, Field} from 'formik';
import {useHistory} from "react-router-dom";
import {bindActionCreators} from 'redux';
import {connect} from '../../../helpers/connect';
import {signIn} from '../../../actions/user'
import {HOME_PATH} from '../../../router'
import {WrappedForm} from '../styles'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

import * as Yup from 'yup';

interface IFormikValues {
    username: string;
    password: string;
    showPassword: boolean;
}

const Authenticate = ({signIn, ...props}: any) => {
    const InitialValues: IFormikValues = {
        username: '',
        password: '',
        showPassword: false,
    }
    const {push} = useHistory()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const handleSubmit = async (values: IFormikValues) => {
        await signIn(values)
        push(HOME_PATH)
    };

    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .required('Required'),
        password: Yup.string()
            .required('Required'),
    });

    return (
        <Formik
            initialValues={InitialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
        >
            {({errors, values, handleChange}: FormikProps<IFormikValues>) => (
                <WrappedForm>
                    <Field name="username">
                        {({field, form}: { field: any; form: FormikProps<IFormikValues> }) => {
                            const handleChange = (value: string) => form.setFieldValue('username', `+${value}`);
                            return (
                                <PhoneInput
                                    inputClass={errors.username ? 'phone-input phone-error' : 'phone-input'}
                                    onChange={handleChange}
                                    value={field.username}
                                    placeholder='Enter your phone'
                                />
                            );
                        }}
                    </Field>
                    {errors.username && <div className='phone-error-text'>{errors.username}</div>}
                    <div className='password'>
                        <TextField
                            id="outlined-password"
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            variant="outlined"
                            value={values.password}
                            onChange={handleChange}
                            placeholder='enter your password'
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />
                    </div>
                    <Button
                        className='auth-button'
                        variant="outlined"
                        color="primary"
                        fullWidth
                        type='submit'
                        size='large'
                    >Login</Button>
                </WrappedForm>
            )}
        </Formik>
    )
}

export default (connect(
    null,
    (dispatch) => bindActionCreators({signIn}, dispatch)
) as any)(Authenticate)