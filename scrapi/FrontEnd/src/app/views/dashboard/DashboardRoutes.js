import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const Home = Loadable(lazy(() => import('./Home')))

const dashboardRoutes = [
    {
        path: '/home',
        element: <Home />,
        auth: authRoles.admin,
    },
]

export default dashboardRoutes
