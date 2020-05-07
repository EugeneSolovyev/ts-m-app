import * as Yup from 'yup';

const phoneRegExp: any = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
const SignupSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required('Required'),
});

export default SignupSchema;