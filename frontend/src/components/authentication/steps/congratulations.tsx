import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'
import CongratulationIcon from '../assets/congratulation.png'

interface IPhoneCheckProps {
    onContinue(): void;
}

const CongratulationView = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h5 {
        margin: 1rem 0;
    }

    img {
        width: 30%;
        height: auto;
        object-fit: contain;
        filter: drop-shadow(0 0 0.75rem rgba(44, 62, 80, .5));
    }
`

const Congratulations = ({ onContinue }: IPhoneCheckProps) => (
    <CongratulationView>
        <img src={CongratulationIcon} alt="Congratulations" />
        <h5>You've successfully created a user</h5>
        <Button size="large" block htmlType="button" onClick={onContinue}>Log In</Button>
    </CongratulationView>
)

export default Congratulations