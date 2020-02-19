import React from 'react';
import { Route, RouteComponentProps, Switch, Redirect } from 'react-router-dom';
import Authentication from '../authentication'
import { connect } from '../../helpers/connect';
import router, { IRouter } from '../../router';

@(connect((state) => ({
	...state.user
})) as any)
export default class RouterHandler extends React.Component<any> {
	render() {
		const { current } = this.props;

        if (!current) return <Authentication />

		return (
			<Switch>
				{router.reduce((allowedRouter: any, { path, component: Component, protectedRoute }: IRouter) => {
					if (!current && protectedRoute) return allowedRouter;

					return [
						...allowedRouter,
						<Route
							key={path}
							path={path}
							render={(props: RouteComponentProps<any>) => <Component {...props} />}
						/>
					];
				}, [])}
                <Redirect from="*" to="/auth" />
			</Switch>
		);
	}
}
