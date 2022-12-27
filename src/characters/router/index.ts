import type { RouteRecordRaw } from "vue-router";

const ROUTE_NAME = "characters";

export const characterRoute: RouteRecordRaw = {
    path: `/${ROUTE_NAME}`,
    redirect: `/${ROUTE_NAME}/list`,
    name: "Characters",
    component: () => import("@/characters/layout/CharacterLayout.vue"),
    children: [
        {
            path: ":id",
            name: "CharacterId",
            props: { title: 'Por Id', visible: false },
            component: () => import("@/characters/pages/CharacterId.vue"),
        },
        {
            path: "list",
            name: "CharacterList",
            props: { title: 'Lista de Personajes', visible: true },
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
