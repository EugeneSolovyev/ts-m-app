import React from "react";
import { Icon, Avatar } from "antd";
import { bindActionCreators } from "redux";
import { path } from "ramda";
import { connect } from "../../helpers/connect";
import { signOut } from "../../actions/user";
import HeaderView from "./styles";
import { IStore } from "../../store";
import { IUser } from "../../reducers/reducers.d";
import LogoIcon from "./assets/live.png";
import { getCurrentUser } from "../../actions/user"; 
import { Link } from 'react-router-dom';

const currentUserSelector = (state: IStore): IUser | null =>
  path(["user", "current"], state);

@(connect(
  (state: IStore) => ({
    current: currentUserSelector(state),
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getCurrentUser,
        signOut,
      },
      dispatch
    )
) as any)
export default class Header extends React.Component<any> {
  async componentDidMount() {
    const { getCurrentUser } = this.props;
    await getCurrentUser();
  }

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
            <Link to="/send-music" className="link">Add track</Link>
						<Link to="/" onClick={signOut}>
							<Icon type="logout" />
						</Link>
					</div>
				)}
			</HeaderView>
		);
	}
}
