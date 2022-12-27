<script setup lang="ts">
import { useRoute } from "vue-router";
import characterStore from "@/store/characters.store";

import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Character } from "@/interfaces/character";
import { useQuery } from "@tanstack/vue-query";

const route = useRoute();

// in this case the reactivity will be lost
const { id } = route.params as { id: string };

const getCharacterCacheFirst = async (
    characterId: string
): Promise<Character> => {
    if (characterStore.checkId(characterId)) {
        return characterStore.ids.list[characterId];
    }

    const { data } = await rickAndMortyApi.get<Character>(
        `/character/${characterId}`
    );
    return data;
};

const { data: character } = useQuery<Character>(
    ["character", id],
    () => getCharacterCacheFirst(id),
    {
        onSuccess: (data) => {
            characterStore.loadId(data);
        },
    }
);
</script>

<template>
    <div>
        <h1>Character #{{ id }}</h1>
        <h1 v-if="!character">Loading...</h1>
        <h1 v-else-if="characterStore.characters.hasError">
            {{ characterStore.characters.errorMessage }}
        </h1>
        <div v-else class="card">
            <figure>
                <img :src="character.image" :alt="character.name" class="card-image" />
            </figure>
            <div class="card-content">
                <h2>{{ character.name }}</h2>
                <p>{{ character.species }}</p>
                <p>Origin: {{ character.origin.name }}</p>
                <p>Location: {{ character.location.name }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
}

figure {
    width: 100%;
    height: 250px;
    background-color: #333;
    padding: 10px;
    display: flex;
    place-content: center;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}


.card-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
}

.card-content > * {
    margin: 0.5rem 0;
}

.card-footer {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
