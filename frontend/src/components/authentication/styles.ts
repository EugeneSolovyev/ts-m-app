import styled from 'styled-components'
import { Form } from 'formik'

export const WrappedForm = styled(Form)`
    .phone-input {
        width: 100%;
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
    
    .auth-button {
        margin-top: 20px;
    }
    .password {
        margin-top: 20px;
    }
        

`


export default styled.div`
    
`