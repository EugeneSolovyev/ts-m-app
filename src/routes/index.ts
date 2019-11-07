import App from '../containers/App'

export type RouterType = {
  path: string,
  component: any,
  isProtected: boolean,
}

export const router: RouterType[] = [
  {
    path: '/',
    component: App,
    isProtected: false,
  },
  {
    path: '/auth',
    component: App,
    isProtected: false,
  },
  {
    path: '/protected',
    component: App,
    isProtected: true,
  }
]
