import React from 'react';
import { Button, Icon, Avatar } from 'antd';
import { bindActionCreators } from 'redux';
import { path } from 'ramda'
import { connect } from '../../helpers/connect';
import { signOut } from '../../actions/user';
import HeaderView from './styles';
import { IStore } from '../../store'
import { IUser } from '../../reducers/reducers.d'
import LogoIcon from './assets/live.png'

const currentUserSelector = (state: IStore): IUser | null => path(['user', 'current'], state)

@(connect(
	(state: IStore) => ({
		current: currentUserSelector(state)
	}),
	(dispatch) => bindActionCreators({
		signOut
	}, dispatch)
) as any)
export default class Header extends React.Component<any> {
	render() {
		const { current, signOut } = this.props;

		return (
			<HeaderView>
				<img src={LogoIcon} alt="logo"/>
				{current && (
					<div className="auth-control">
						<Avatar icon="user" />
						<span className="username">
							{current.username}
						</span>
						<Button htmlType="button" type="link" onClick={signOut}>
							<Icon type="logout" />
						</Button>
					</div>
				)}
			</HeaderView>
		);
	}
}
