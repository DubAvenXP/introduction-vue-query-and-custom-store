import type { RouteRecordRaw } from "vue-router";

export const characterRoute: RouteRecordRaw = {
    path: "/characters",
    redirect: "/characters/list",
    name: "Characters",
    component: () => import("@/characters/layout/CharacterLayout.vue"),
    children: [
        {
            path: "by/id",
            name: "CharacterId",
            props: { title: 'Por Id', visible: false },
            component: () => import("@/characters/pages/CharacterId.vue"),
        },
        {
            path: "list",
            name: "CharacterList",
            props: { title: 'Lista', visible: true },
            component: () => import("@/characters/pages/CharacterList.vue"),
        },
        {
            path: "search",
            name: "CharacterSearch",
            props: { title: 'Búsqueda', visible: true },
            component: () => import("@/characters/pages/CharacterSearch.vue"),
        }
    ]
}
