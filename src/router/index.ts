import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/shared/pages/HomePage.vue";
import AboutPage from "@/shared/pages/AboutPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Public
        { path: "/", name: "Home", component: HomePage },
        { path: "/about", name: "About", component: AboutPage },

        // Characters
        {
            path: "/characters",
            name: "Characters",
            component: () => "@/characters/layouts/CharactersLayout.vue",
        },

        // Default
        { path: "/:pathMatch(.*)*", redirect: () => ({ name: "Home" }) },
    ],
});

export default router;
