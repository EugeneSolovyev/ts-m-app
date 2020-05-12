import React, { useState, useMemo } from 'react';
import { pathOr } from 'ramda'
import { SignUpProvider } from '../../common/contexts/sign-up.context'
import PhoneCheck from './steps/phone-check'
import Registration from './steps/registration/registration'
import Congratulations from './steps/congratulations'
import Authenticate from './steps/authenticate'
import step from "./constant";

const SIGN_UP_COMPONENTS = {
	[step.PHONE_CHECK_STEP]: PhoneCheck,
	[step.REGISTRATION_STEP]: Registration,
	[step.CONGRATULATIONS_STEP]: Congratulations,
	[step.AUTHENTICATE_STEP]: Authenticate
}

type StepType = keyof typeof SIGN_UP_COMPONENTS

const SignUp = () => {
	const [step, setStep] = useState<StepType>(1)
	const StepComponent = useMemo(() => pathOr(null, [step], SIGN_UP_COMPONENTS), [step])

	const hadnleContinue = (step?: number): void => {
		if(step){
			setStep(step)
		} else {
			setStep((prev: StepType) => ++prev as StepType);
		}
	}

	return (
		<SignUpProvider>
			<StepComponent onContinue={hadnleContinue}/>
		</SignUpProvider>
	);
};

export default SignUp;