import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';

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
        { path: '/:notFound(.*)', component: null}
    ]
});

export default router;