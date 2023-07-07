import { createWebHistory, createRouter } from "vue-router";
import Main from './components/Main.vue'
import CharacterInfo from './components/character/Info.vue'

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/character/:name',
        component: CharacterInfo
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;