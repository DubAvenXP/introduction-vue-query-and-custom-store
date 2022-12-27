import { reactive } from "vue";

import type { Character, ResponseCharacter } from "@/interfaces/character";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import { isAxiosError } from "axios";

interface Store {
    characters: {
        list: Character[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    }

    ids: {
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
        list: {
            [id: string]: Character;
        }
    }

    // Characters methods
    startLoadingCharacters: () => void;
    loadCharacters: (data: Character[]) => void;
    loadCharactersFailed: (error: string) => void;

    // Ids methods
    startLoadingId: (id: string) => Promise<void>;
    loadId: (data: Character) => void;
    loadIdFailed: (error: string) => void;
    checkId: (id: string) => boolean;
}

// Initial state
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        list: [],
        isLoading: true,
        hasError: false,
        errorMessage: null
    },
    ids: {
        isLoading: true,
        hasError: false,
        errorMessage: null,
        list: {}
    },

    async startLoadingCharacters() {
        try {
            this.characters.isLoading = true;
            const { data } = await rickAndMortyApi.get<ResponseCharacter>("/character");
            this.loadCharacters(data.results);
        } catch (error) {
            if (isAxiosError(error)) this.loadCharactersFailed(error.message);
        } finally {
            this.characters.isLoading = false;
        }
    },
    loadCharacters(data: Character[]) {
        this.characters = {
            ...this.characters,
            list: data,
            count: data.length,
            isLoading: false,
        }
    },
    loadCharactersFailed(error: string) {
        this.characters = {
            count: 0,
            hasError: true,
            errorMessage: error,
            isLoading: false,
            list: []
        }
    },

    // Ids methods
    async startLoadingId(id: string): Promise<void> {
        try {
            this.ids = {
                ...this.ids,
                isLoading: true,
                hasError: false,
                errorMessage: null
            }
            const { data } = await rickAndMortyApi.get<Character>(`character/${id}`);
            this.loadId(data);
        } catch (error) {
            if (isAxiosError(error)) this.loadIdFailed(error.message);
        } finally {
            this.ids.isLoading = false;
        }
    },
    loadId(data: Character) {
        this.ids.list[data.id] = data;
    },
    loadIdFailed(error: string) {
        this.ids = {
            ...this.ids,
            hasError: true,
            errorMessage: error,
            isLoading: false,
        }
    },
    checkId(id: string) {
        return !!this.ids.list[id];
    }
})


characterStore.startLoadingCharacters();

export default characterStore;
