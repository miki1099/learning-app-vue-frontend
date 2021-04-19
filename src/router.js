import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import UserAuth from './pages/auth/UserAuth.vue'
import UserCreate from './pages/auth/UserCreate.vue'
import NotFound from './pages/notFound/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HelloWorld},
        { path: '/learn', component: null},
        { path: '/me', component: null},
        { path: '/achivements', component: null},
        { path: '/test', component: null},
        { path: '/curiocity', component: null},
        { path: '/login', component: UserAuth},
        { path: '/register', component: UserCreate},
        { path: '/:notFound(.*)', component: NotFound}
    ]
});

export default router;