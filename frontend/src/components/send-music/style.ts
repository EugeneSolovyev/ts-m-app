import styled from 'styled-components'

import { Form } from 'formik'

export const WrappedForm = styled(Form)`
    width: 600px;
    height: 600px;

    .MuiFormControl-root {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        border-radius: 50px;
        width: 100%;
    }

    .MuiTypography-root{
        text-align: center;
    }

    .MuiButton-root{
        margin-top: 20px;   
    }
    
    .label{
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
    }
    
    .input{
        display: none
    }

    .picture{
        margin-right: 30px;
    }

    .button{
        display: block;
        margin: 20px 0;
    }

    .MuiButtonBase-root {
        margin: 20px 0;
    }

    .upload{
        margin-top: 0;
    }

`;