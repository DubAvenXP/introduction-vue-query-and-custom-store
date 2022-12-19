<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "@/shared/components/Navbar.vue";
import { characterRoute } from "../router";
import type { RouterLink } from "@/router/link-routes";

const routerLinks: RouterLink[] = characterRoute.children!
    .filter((route) => (route.props as { visible: boolean }).visible)
    .map((route) => {
        return {
            name: route.name as string,
            path: route.path,
            title: (route.props as { title: string; visible: boolean })?.title,
        };
    });
</script>

<template>
    <h1>Personajes</h1>
    <Navbar :show-icon="false" :links="routerLinks" />
    <RouterView />
</template>

<style scoped></style>
