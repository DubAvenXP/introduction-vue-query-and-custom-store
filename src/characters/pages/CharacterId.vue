<script setup lang="ts">
import { watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCharacter } from "@/characters/composables";


const route = useRoute();
const router = useRouter();

// in this case the reactivity will be lost
const { id } = route.params as { id: string };

const { character, isLoading, hasError, errorMessage } = useCharacter(id);

watchEffect(() => {
    if (!isLoading.value && hasError.value) {
        router.replace("/characters");
    }
});
</script>

<template>
    <div>
        <h1>Character #{{ id }}</h1>
        <h1 v-if="isLoading">Loading...</h1>
        <h1 v-else-if="hasError">
            {{ errorMessage }}
        </h1>
        <div v-else-if="character" class="card">
            <figure>
                <img
                    :src="character.image"
                    :alt="character.name"
                    class="card-image"
                />
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

h1 {
    margin: 2rem 0;
}
</style>
