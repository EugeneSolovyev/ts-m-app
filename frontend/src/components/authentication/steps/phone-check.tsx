import React, {useContext} from "react";
import {Field, Formik, FormikProps} from "formik";
import { verifyPhone, checkPhone } from "../../../actions/user";
import { SignUpContext } from "../../../common/contexts/sign-up.context";
import { WrappedForm } from "../styles";
import { Button } from "@material-ui/core";
import SignupSchema from "../../../validation-schemas/index";
import step from "../constant";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import {toast} from "react-toastify";

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
    setValues,
    handleUpdateValues,
  } = useContext(SignUpContext);
  const InitialValues: IFormikValues = {
    phone,
  };

  const handleSubmit = async (values: IFormikValues) => {
    const { exists } = await checkPhone(values.phone);

    if (!exists) {
      try {
        await verifyPhone(values.phone);
        handleUpdateValues(values);
        onContinue(step.REGISTRATION_STEP);

      } catch (e) {
        toast.error(e.message);
      }
    } else {
      setValues((prevState: any) => ({
        ...prevState,
        phone: values.phone
        })
      );
      onContinue(step.AUTHENTICATE_STEP);
    }
  };

  return (
    <Formik
      initialValues={InitialValues}
      onSubmit={handleSubmit}
      validationSchema={SignupSchema}
    >
      {({ errors }: FormikProps<IFormikValues>) => (
        <WrappedForm>
          <Field name="phone">
            {({field, form}: { field: any; form: FormikProps<IFormikValues> }) => {
              const handleChange = (value: string) => form.setFieldValue('phone', `+${value}`);
              return (
                <PhoneInput
                  inputClass={errors.phone ? 'phone-input phone-error' : 'phone-input'}
                  onChange={handleChange}
                  value={field.phone}
                  placeholder='Enter your phone'
                />
              );
            }}
          </Field>
          {errors.phone && <div className='phone-error-text'>{errors.phone}</div>}
          <Button fullWidth type="submit" variant="outlined" color="primary">
            Check phone number and continue
          </Button>
        </WrappedForm>
      )
      }
    </Formik>
  );
};

export default PhoneCheck;
