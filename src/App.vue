<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./shared/components/Navbar.vue";
import { routerLinks } from "./router/link-routes";
</script>

<template>
    <div class="wrapper">
        <header>
            <Navbar title="BreakingBad" :links="routerLinks"/>
        </header>
        <main>
            <RouterView />
        </main>
    </div>
</template>

<style scoped>
.wrapper {
    height: auto;
    margin: 0 auto;
}

main {
    padding: 2rem 4rem;
    height: 100%;
}
</style>
