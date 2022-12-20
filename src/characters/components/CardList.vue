<script setup lang="ts">
import { ref } from "vue";

import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Character, ResponseCharacter } from "../../interfaces/character";
import { useCharacters } from "@/characters/composables";
import { useQuery } from "@tanstack/vue-query";

// useCharacters with global state
// const { characters, isLoading, hasError, errorMessage } = useCharacters();
const getCharactersSlow = async (): Promise<Character[]> => {
    const { data } = await rickAndMortyApi.get<ResponseCharacter>("/character");
    return data.results;
};

const { isError, isLoading, error, data: characters } = useQuery(["characters"], getCharactersSlow);
</script>
<template>
    <h1 v-if="isLoading">Loading...</h1>
    <template v-if="isError">
        <h1>{{ error }}</h1>
    </template>
    <ul>
        <li v-for="character in characters" :key="character.id">
            {{ character.name }}
        </li>
    </ul>
</template>
<style scoped></style>
