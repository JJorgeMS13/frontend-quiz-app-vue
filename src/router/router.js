/* Se importan los componentes a mostrar */
import QuizApp from "@/page/QuizApp.vue";
import StartMenu from "@/page/StartMenu.vue";
import ScorePage from "@/page/ScorePage.vue";
/* Se importan medotos de la libreria de Vue-Router que se ocupan */
import { createRouter, createWebHashHistory } from "vue-router";

// Se crean las rutas que se van a mostrar y los componentes que se mostrar en esa ruta
const routes = [
    { 
        path: '/',
        name: 'home',
        component: StartMenu
    },
    { 
        path: '/quiz/:option', 
        component: QuizApp, 
        props: ( route ) => {
            const option = route.params.option
            return {
                option
            }
        }  
    },
    { 
        path: '/Scored:objScored',
        name: 'Scored',
        component: ScorePage,
        props: true,
    },
    { path: '/:pathMatch(.*)*', name: 'home', component: StartMenu },
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router