import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const ProfilePage = Loadable(lazy(() => import('./Profile')))
const BenefitPage = Loadable(lazy(() => import('./Benefit')))
const Community = Loadable(lazy(() => import('./Community')))
const Help = Loadable(lazy(() => import('./Help')))
const InsuredRisk = Loadable(lazy(() => import('./InsuredRisk')))
const Security = Loadable(lazy(() => import('./Security')))
const StackedAssets = Loadable(lazy(() => import('./StakedAssets')))
const History = Loadable(lazy(() => import('./History')))

const pageRoutes = [
    {
        path: '/profile',
        element: <ProfilePage />,
        auth: authRoles.admin,
    },
    {
        path: '/benefit',
        element: <BenefitPage />,
        auth: authRoles.admin,
    },
    {
        path: '/risk',
        element: <InsuredRisk />,
        auth: authRoles.admin,
    },
    {
        path: '/stackedassets',
        element: <StackedAssets />,
        auth: authRoles.admin,
    },
    {
        path: '/community',
        element: <Community />,
        auth: authRoles.admin,
    },
    {
        path: '/security',
        element: <Security />,
        auth: authRoles.admin,
    },
    {
        path: '/history',
        element: <History />,
        auth: authRoles.admin,
    },
    {
        path: '/chat',
        element: <History />,
        auth: authRoles.admin,
    },
    {
        path: '/help',
        element: <Help />,
        auth: authRoles.admin,
    },
]

export default pageRoutes
