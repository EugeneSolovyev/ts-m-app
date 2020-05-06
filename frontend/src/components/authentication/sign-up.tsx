import React, { useState, useMemo } from 'react';
import { pathOr } from 'ramda'
import { SignUpProvider } from '../../common/contexts/sign-up.context'
import PhoneCheck from './steps/phone-check'
import Registration from './steps/registration/registration'
import Congratulations from './steps/congratulations'
import Authenticate from './steps/authenticate'

const SIGN_UP_COMPONENTS = {
	1: PhoneCheck,
	2: Registration,
	3: Congratulations,
	4: Authenticate
}

type StepType = keyof typeof SIGN_UP_COMPONENTS

const SignUp = () => {
	const [step, setStep] = useState<StepType>(1)
	const StepComponent = useMemo(() => pathOr(null, [step], SIGN_UP_COMPONENTS), [step])

	const hadnleContinue = (): void => {
		setStep((prev: StepType) => ++prev as StepType);
	}

	return (
		<SignUpProvider>
			<StepComponent onContinue={hadnleContinue} />
		</SignUpProvider>
	);
};

export default SignUp;
