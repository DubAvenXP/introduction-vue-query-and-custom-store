<script setup lang="ts">
import type { Character } from "@/interfaces/character";

import CharacterCard from "./CharacterCard.vue";

interface Props {
    characters: Character[];
}

const props = defineProps<Props>();
</script>
<template>
    <ul class="container">
        <CharacterCard v-for="character in props.characters" :key="character.id" :character="character" />
    </ul>
</template>
<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-auto-rows: 350px;
    gap: 20px;
    padding: 0;
}
</style>
