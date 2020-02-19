import { lazy } from 'react';

const Authentication = lazy(() => import('../components/authentication'));

const Home = lazy(() => import('../components/home'));

export interface IRouter {
	path: string;
	component: any;
	protectedRoute: boolean;
}

export const AUTH_PATH: string = '/auth'
export const HOME_PATH: string = '/'

const router: IRouter[] = [
	{
		path: AUTH_PATH,
		component: Authentication,
		protectedRoute: false
	},
	{
		path: HOME_PATH,
		component: Home,
		protectedRoute: true
	}
];

export default router;
