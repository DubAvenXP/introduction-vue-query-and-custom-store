import { computed, ref } from "vue";

import type { Character } from "@/interfaces/character";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import { useQuery } from "@tanstack/vue-query";
import { isAxiosError } from "axios";

const characterSet = ref<{ [id: string]: Character }>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async (id: string): Promise<Character> => {
    if (characterSet.value[id]) return characterSet.value[id];

    const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
    return data;
};

const loadCharacter = (data: Character) => {
    hasError.value = false;
    errorMessage.value = null;
    characterSet.value[data.id] = data;
};

const loadCharacterError = (error: unknown) => {
    hasError.value = true;
    if (isAxiosError(error)) {
        errorMessage.value = error.response?.data.error;
    }
};

export const useCharacter = (id: string) => {
    const { isLoading } = useQuery<Character>(
        ["character", id],
        () => getCharacter(id),
        {
            onSuccess: loadCharacter,
            onError: loadCharacterError,
        }
    );

    return {
        // properties
        list: characterSet,
        hasError,
        errorMessage,
        isLoading,

        // getters
        character: computed<Character | null>(() => characterSet.value[id]),
    };
};

export default useCharacter;
