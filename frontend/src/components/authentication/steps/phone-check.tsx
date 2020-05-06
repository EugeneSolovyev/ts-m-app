import React, { useContext } from 'react'
import { Formik, FormikProps } from 'formik';
import { Input, Button } from 'antd'
import { verifyPhone } from '../../../actions/user'
import { SignUpContext } from '../../../common/contexts/sign-up.context'
import { WrappedForm } from '../styles'

interface IFormikValues {
    phone: string;
}

interface IPhoneCheckProps {
    onContinue(): void;
    phoneExist(): void;
}

const PhoneCheck = ({ onContinue, phoneExist }: IPhoneCheckProps) => {
    const { phone, setPhone } = useContext(SignUpContext)
    const InitialValues: IFormikValues = {
        phone
    }

    const handleSubmit = async (values: IFormikValues) => {
        try {
            const res = await verifyPhone(values.phone);
            if (res) {
                phoneExist()
            } else {
                setPhone(values.phone);
                onContinue()
            }
        } catch (error) {
            console.log(error)
        }
    };
    
    return (
        <Formik
            initialValues={InitialValues}
            onSubmit={handleSubmit}
        >
            {({ values, handleChange }: FormikProps<IFormikValues>) => (
                <WrappedForm>
                    <Input size="large" type="text" value={values.phone} onChange={handleChange} name="phone" placeholder="Type your phone number here..." />
                    <Button size="large" block htmlType="submit">Check phonenumber and continue</Button>
                </WrappedForm>
            )}
        </Formik>
    )
}

export default PhoneCheck;