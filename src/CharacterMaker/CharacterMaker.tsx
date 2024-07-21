import { useState } from "react";
import { CharacterList } from "../AreaMaker/Character/CharacterList";
import { Character } from "../AreaMaker/domain/types";
import { Page } from "../SharedComponents/Page/Page";

export const CharacterMaker = () => {
    const [characters, setCharacters] = useState<Array<Character>>([]);

    return <Page title="RPG Tools">
        <div>
            <h1>Character Maker</h1>
            <div>
                <CharacterList characters={characters} setCharacters={setCharacters} />
            </div>
        </div>
    </Page>;
};
