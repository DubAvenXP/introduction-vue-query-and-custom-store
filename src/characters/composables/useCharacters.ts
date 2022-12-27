import { computed, ref } from "vue";
import { useQuery } from "@tanstack/vue-query";

import type { Character, ResponseCharacter } from "@/interfaces/character";
import rickAndMortyApi from '@/api/rickAndMortyApi';
import { isAxiosError } from 'axios';

// defined in the global state
const characters = ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
    if (characters.value.length) return characters.value;
    const { data } = await rickAndMortyApi.get<ResponseCharacter>("/character");
    return data.results;
};

const loadCharacters = (data: Character[]) => {
    hasError.value = false;
    errorMessage.value = null;
    characters.value = data;
};

const loadError = (error: unknown) => {
    hasError.value = true;
    if (isAxiosError(error)) {
        errorMessage.value = error.response?.data.error;
    }
}

export const useCharacters = () => {
    const { isLoading } = useQuery(["characters"], getCharacters, {
        onSuccess: loadCharacters,
        onError: loadError,
    });

    return {
        // properties
        characters,
        isLoading,
        hasError,
        errorMessage,

        // getters
        count: computed(() => characters.value.length),

        // methods
    };
};
