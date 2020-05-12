import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import CongratulationIcon from "../assets/congratulation.png";
import step from "../constant";

interface IPhoneCheckProps {
  onContinue(step: number): void;
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
    filter: drop-shadow(0 0 0.75rem rgba(44, 62, 80, 0.5));
  }
`;

const Congratulations = ({ onContinue }: IPhoneCheckProps) => {
  const handleClickLogin = () => {
    onContinue(step.AUTHENTICATE_STEP);
  };

  return (
    <CongratulationView>
      <img src={CongratulationIcon} alt="Congratulations" />
      <h5>You've successfully created a user</h5>
      <Button
        size="medium"
        variant="outlined"
        color="primary"
        onClick={handleClickLogin}
      >
        Log In
      </Button>
    </CongratulationView>
  );
};

export default Congratulations;
