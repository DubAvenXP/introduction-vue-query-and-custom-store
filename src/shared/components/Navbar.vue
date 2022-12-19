<script lang="ts" setup>
import type { RouterLink } from "@/router/link-routes";

interface Props {
    title?: string;
    links: RouterLink[];
    showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    title: "",
    showIcon: true,
    links: () => [],
});
</script>
<template>
    <nav>
        <img  v-if="props.showIcon" src="@/assets/logo.svg" alt="vue logo" height="25" width="25" />
        <span v-if="props.links">{{ props.title }}</span>

        <RouterLink
            v-for="link of props.links"
            :key="link.path"
            :to="link.path"
        >
            {{ link.title }}
        </RouterLink>
    </nav>
</template>

<style scoped>
nav {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 2rem 4rem;
    background-color: #333;
    color: #fff;
    height: auto;
}

img {
    margin-right: 0.5rem;
}

span {
    font-weight: 600;
}

a {
    margin-left: 1rem;
    color: #fff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.router-link-active {
    color: hsla(160, 100%, 37%, 1);
}

.router-link-exact-active {
    text-decoration: underline;
}
</style>
