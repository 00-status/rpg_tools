import { useEffect, useState } from "react";

import { Character } from "../AreaMaker/domain/types";

type UseCharacters = {
    characters: Array<Character>;
    setCharacters: (characters: Array<Character>) => void;
};

export const useCharacters = (): UseCharacters => {
    const [characters, setCharacters] = useState<Array<Character>>([]);
  
    useEffect(() => {
        const charactersString = localStorage.getItem('characters');

        if (charactersString) {
            const parsedCharacters: Array<Character> = JSON.parse(charactersString);

            setCharacters(parsedCharacters);
        }
    }, [setCharacters]);

    return {
        characters,
        setCharacters
    };
};
