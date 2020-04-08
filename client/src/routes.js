import Index from './pages/Index'
import List from './pages/lists/List'
import Create from './pages/lists/Create'
import Login from './pages/auth/Login'

export const routes = [
    { 
        path: '/', 
        component: Index,
        name: 'index',
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
    },
    {
        path: '/list/:id/edit',
        component: Create,
        name: 'edit',
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
]
