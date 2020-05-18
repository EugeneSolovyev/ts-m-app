import styled from 'styled-components'
import { Form } from 'formik'

export const WrappedForm = styled(Form)`
    .MuiTextField-root {
        margin-bottom: 1rem;
        border-radius: 50px;
    }
    .phone-input {
        width: 100%;
    }

    .error{
        color: #f44336;
        padding: 0px 14px 20px;
    }
    
    .phone-error {
        border: 1px solid #f44336;;
     }
     
    .phone-error-text {
        color: #f44336;
        margin-left: 14px;
        margin-right: 14px;
        margin-top: 3px;
        font-size: 0.75rem;
        text-align: left;
        font-weight: 400;
        line-height: 1.66;
        letter-spacing: 0.03333em;
    }
   
    .password {
        margin-top: 20px;
    }
        

`


export default styled.div`
    
`