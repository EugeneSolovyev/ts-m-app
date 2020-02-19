import React, { useState, useMemo } from 'react';
import { Button, Result } from 'antd';
import { normalize } from '../../helpers/string.utils'
import AuthenticationView from './styles';
import SignUpComponent from './sign-up';
import Authenticate from './steps/authenticate'
import Modal from '../../ui/modal'
import { isNil } from 'ramda'

const AUTH_VIEW = {
	signUp: SignUpComponent,
	signIn: Authenticate,
}

const Authentication = () => {
	const [visible, setVisible] = useState<boolean>(false)
	const [component, setComponent] = useState<keyof typeof AUTH_VIEW | null>(null)

	const handleCloseModal = () => {
		setVisible(false);
		setComponent(null)
	}

	const onSignIn = () => {
		setVisible(true)
		setComponent('signIn')
	}

	const onSignUp = () => {
		setVisible(true)
		setComponent('signUp')
	}

	const AuthComponent = useMemo(() => AUTH_VIEW[component], [component])

	return (
		<AuthenticationView>
 				<Result
					status="403"
					title="You're not logged in"
					subTitle="Please, authenticate in the app"
					extra={
						<>
							<Button type="primary" onClick={onSignIn}>
								Sign in
							</Button>
							<Button type="primary" onClick={onSignUp}>
								Sign up
							</Button>
						</>
					}
				/>
				<Modal
					title={!!component && normalize(component)}
					size="medium"
					show={visible}
					onClose={handleCloseModal}
				>
					{!isNil(component) && <AuthComponent />}
				</Modal>
			</AuthenticationView>
	)
}

export default Authentication
