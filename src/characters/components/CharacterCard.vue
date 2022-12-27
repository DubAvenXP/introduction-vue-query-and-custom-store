<script setup lang="ts">
import type { Character } from "@/interfaces/character";
import { toRef } from "vue";

interface Props {
    character: Character;
}

const props = defineProps<Props>();

// convert the props to a ref so we can use it in
// the template without having to use props.character
const character = toRef(props, "character");
</script>
<template>
    <li class="card">
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
        <div class="card-footer">
            <router-link :to="`/characters/${character.id}`">
                View Details
            </router-link>
        </div>
    </li>
</template>
<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

figure {
    width: 100%;
    height: 35%;
    background-color: #333;
    padding: 10px;
    display: flex;
    place-content: center;
}

.card-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 10px;
}

.card-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 10px;
}

.card-footer a {
    text-decoration: none;
    color: #fff;
    background-color: #000;
    padding: 10px;
    border-radius: 5px;
}
</style>
