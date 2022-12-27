<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

import rickAndMortyApi from "@/api/rickAndMortyApi";

import CardList from "@/characters/components/CardList.vue";

import type { Character, ResponseCharacter } from "@/interfaces/character";

const props = defineProps<{ title: string; visible: boolean }>();


const getCharacters = async (): Promise<Character[]> => {
    const { data } = await rickAndMortyApi.get<ResponseCharacter>("/character");
    return data.results;
};

const {
    isError,
    isLoading,
    error,
    data: characters,
} = useQuery(["characters"], getCharacters);

</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <template v-else>
        <h2>{{ props.title }}</h2>
        <CardList :characters="characters!"/>
    </template>
</template>

<style scoped>
h2 {
    margin: 2rem 0;
}
</style>
