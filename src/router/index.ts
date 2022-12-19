import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/shared/pages/HomePage.vue";
import AboutPage from "@/shared/pages/AboutPage.vue";

import { characterRoute } from '@/characters/router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Public
        { path: "/", name: "Home", component: HomePage },
        { path: "/about", name: "About", component: AboutPage },

        // Characters
        characterRoute,

        // Default
        { path: "/:pathMatch(.*)*", redirect: () => ({ name: "Home" }) },
    ],
});

// path: "/characters",
// router.addRoute(characterRoute)

export default router;
