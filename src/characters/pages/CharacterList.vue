<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import rickAndMortyApi from "@/api/rickAndMortyApi";

import CardList from "@/characters/components/CardList.vue";

import type { Character, ResponseCharacter } from "@/interfaces/character";
import characterStore from "@/store/characters.store";

const props = defineProps<{ title: string; visible: boolean }>();


const getCharactersCacheFirst = async (): Promise<Character[]> => {
    if (characterStore.characters.count) return characterStore.characters.list;
    const { data } = await rickAndMortyApi.get<ResponseCharacter>("/character");
    return data.results;
};

// const { isError, isLoading, error, data,} =
useQuery(["characters"], getCharactersCacheFirst, {
    onSuccess: (characters) => {
        characterStore.loadCharacters(characters);
    },
    // onError: (error) => {
    // },
});


</script>

<template>
    <h1 v-if="characterStore.characters.isLoading">Loading...</h1>
    <h1 v-else-if="characterStore.characters.hasError">
        {{ characterStore.characters.errorMessage }}
    </h1>
    <template v-else>
        <h2>{{ props.title }}</h2>
        <CardList :characters="characterStore.characters.list"/>
    </template>
</template>

<style scoped>
h2 {
    margin: 2rem 0;
}
</style>
