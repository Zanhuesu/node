import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'
import { authRoles } from '../../auth/authRoles'

const RoomPage = Loadable(lazy(() => import('../Room')))

const roomRoutes = [
    {
        path: '/room',
        element: <RoomPage />,
        auth: authRoles.admin,
    }
]

export default roomRoutes
