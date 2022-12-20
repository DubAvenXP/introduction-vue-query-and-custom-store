<script setup lang="ts">
import { ref } from "vue";

import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Character, ResponseCharacter } from "../../interfaces/character";
import { useCharacters } from "@/characters/composables";

// useCharacters with global state
const { characters, isLoading, hasError, errorMessage } = useCharacters();
</script>
<template>
    <h1 v-if="isLoading">Loading...</h1>
    <template v-if="hasError">
        <h1>{{ errorMessage }}</h1>
    </template>
    <ul>
        <li v-for="character in characters" :key="character.id">
            {{ character.name }}
        </li>
    </ul>
</template>
<style scoped></style>
