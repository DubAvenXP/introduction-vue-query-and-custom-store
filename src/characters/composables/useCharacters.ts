import { ref, onMounted } from "vue";
import axios from "axios";

import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Character, ResponseCharacter } from "@/interfaces/character";

// Global state
const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | undefined>();

export const useCharacters = () => {
    // With suspense
    // const { data } = await rickAndMortyApi.get<ResponseCharacter>('/character');
    // const characters = ref<Character[]>(data.results);

    // Local state
    // const characters = ref<Character[]>([]);
    // const isLoading = ref<boolean>(true);

    onMounted(async () => {
        await loadCharacters();
    });

    const loadCharacters = async () => {
        if (characters.value.length) return;

        try {
            isLoading.value = true;
            const { data } = await rickAndMortyApi.get<ResponseCharacter>(
                "/character"
            );
            characters.value = data.results;
        } catch (error) {
            hasError.value = true;
            if (axios.isAxiosError(error)) {
                return (errorMessage.value = error.message);
            }

            errorMessage.value = JSON.stringify(error);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        characters,
        isLoading,
        hasError,
        errorMessage,
    };
};
