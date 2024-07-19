import { Card } from "../../SharedComponents/Card/Card";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Character } from "../domain/types";

type Props = {
    characters: Array<Character>;
    setCharacters: (characters: Array<Character>) => void;
};

export const CharacterList = (props: Props) => {
    const { characters, setCharacters } = props;

    const deleteCharacter = (index: number) => {
        const charactersCopy = [...characters];

        charactersCopy.splice(index, 1);

        setCharacters(charactersCopy);
    };

    const addNewCharacter = () => {
        const newCharacter = { id: crypto.randomUUID(), name: '', nameColor: '' };
        
        setCharacters([...characters, newCharacter]);
    };

    const onCharacterChange = (newCharacter: Character, index: number) => {
        const charactersCopy = [...characters];

        charactersCopy[index] = newCharacter;

        setCharacters(charactersCopy);
    };

    return <Card title="Characters" buttonName="Add new character" buttonAction={addNewCharacter}>
        {characters.map((character: Character, index: number) => {
            return <div>
                    <TextInput
                        key={character.id}
                        id={character.id}
                        label="Name"
                        value={character.name}
                        onChange={(newValue) => {
                            const newCharacter = { ...character, name: newValue ?? '' };

                            onCharacterChange(newCharacter, index);
                        }}
                    />
                    <button onClick={() => deleteCharacter(index)} >Delete</button>
                </div>;
        })}
    </Card>;
};
