import Index from './pages/Index'
import List from './pages/lists/List'
import Create from './pages/lists/Create'

export const routes = [
    { 
        path: '/', 
        component: Index,
    },
    { 
        path: '/list/create', 
        component: Create,
    },
    { 
        path: '/list/:id', 
        component: List,
    },
    {
        path: '/list/:id/edit',
        component: Create,
        name: 'edit',
    }
]
