import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
import UserAuth from './pages/auth/UserAuth.vue'
import UserCreate from './pages/auth/UserCreate.vue'
import NotFound from './pages/notFound/NotFound.vue'
import UserInfo from './pages/user/UserInfo.vue'
import UpdateUserData from './pages/user/UpdateUserData.vue'
import ChangePassword from './pages/user/ChangePassword.vue'
import AdminHome from './pages/admin/AdminHome.vue'
import CreateQuestion from './pages/admin/CreateQuestion.vue'
import HomeTest from './pages/test/HomeTest.vue'
import Test from './pages/test/Test.vue'

import store from './main.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: HelloWorld},
        { path: '/learn', component: null, meta: {requiresAuth: true}},
        { path: '/user/me', component: UserInfo, meta: {requiresAuth: true}},
        { path: '/user/me/changeDetails', component: UpdateUserData, meta: {requiresAuth: true}},
        { path: '/user/me/changePassword', component: ChangePassword, meta: {requiresAuth: true}},
        { path: '/user/me/orders', component: null, meta: {requiresAuth: true}},
        { path: '/achivements', component: null, meta: {requiresAuth: true}},
        { path: '/test', component: HomeTest, meta: {requiresAuth: true}},
        { path: '/test/:mode', component: Test, meta: {requiresAuth: true}},
        { path: '/curiocity', component: null},
        { path: '/login', component: UserAuth, meta: {requiresUnauth: true}},
        { path: '/register', component: UserCreate, meta: {requiresUnauth: true}},
        { path: '/admin/home', component: AdminHome, meta: {requiresAdmin: true}},
        { path: '/admin/createQuestion', component: CreateQuestion, meta: {requiresAdmin: true}},
        { path: '/:notFound(.*)', component: NotFound}
    ]
});

router.beforeEach(function(to, _, next) {
    if(to.meta.requiresAdmin && !store.getters.getIsAdmin ) {
        next('/home');
    } else if(to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/login');
    } else if(to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/home');
    } else {
        next();
    }
});

export default router;