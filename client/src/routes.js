import Index from './pages/Index'
import List from './pages/lists/List'
import Create from './pages/lists/Create'
import Login from './pages/auth/Login'
import Logout from './pages/auth/Logout'

export const routes = [
    { 
        path: '/', 
        component: Index,
        name: 'index',
        meta: {
            requiresAuth: true,
        }
    },
    { 
        path: '/list/create', 
        component: Create,
        name: 'create',
        meta: {
            requiresAuth: true,
        }
    },
    { 
        path: '/list/:id', 
        component: List,
        name: 'list',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/list/:id/edit',
        component: Create,
        name: 'edit',
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/logout',
        component: Logout,
        name: 'logout',
    },
]
