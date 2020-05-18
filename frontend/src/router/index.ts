import { lazy } from 'react';

const Authentication = lazy(() => import('../components/authentication'));

const Home = lazy(() => import('../components/home'));

const SendMusic = lazy(() => import('../components/send-music'));

export interface IRouter {
	path: string;
	component: any;
	protectedRoute: boolean;
}

export const AUTH_PATH: string = '/auth'
export const HOME_PATH: string = '/'
export const SENDMUSIC_PATH: string = '/send-music'

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
	},
	{
		path: SENDMUSIC_PATH,
		component: SendMusic,
		protectedRoute: true
	},
];

export default router;
