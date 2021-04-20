import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import UserAuth from './pages/auth/UserAuth.vue'
import UserCreate from './pages/auth/UserCreate.vue'
import NotFound from './pages/notFound/NotFound.vue'
import UserInfo from './pages/user/UserInfo.vue'
import UpdateUserData from './pages/user/UpdateUserData.vue'
import ChangePassword from './pages/user/ChangePassword.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HelloWorld},
        { path: '/learn', component: null},
        { path: '/user/me', component: UserInfo},
        { path: '/user/me/changeDetails', component: UpdateUserData},
        { path: '/user/me/changePassword', component: ChangePassword},
        { path: '/user/me/orders', component: null},
        { path: '/achivements', component: null},
        { path: '/test', component: null},
        { path: '/curiocity', component: null},
        { path: '/login', component: UserAuth},
        { path: '/register', component: UserCreate},
        { path: '/admin', component: null},
        { path: '/:notFound(.*)', component: NotFound}
    ]
});

export default router;