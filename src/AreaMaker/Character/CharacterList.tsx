
import './character-list.css';
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

    return <Card title="Characters" buttonName="Add character" buttonAction={addNewCharacter}>
        <div className='character-list'>
            {characters.map((character: Character, index: number) => {
                return <div key={character.id} className="character-list__item">
                        <TextInput
                            id={character.name}
                            placeholder='Character Name'
                            value={character.name}
                            onChange={(newValue) => {
                                const newCharacter = { ...character, name: newValue ?? '' };

                                onCharacterChange(newCharacter, index);
                            }}
                        />
                        <TextInput
                            id={character.nameColor}
                            placeholder='Character Name Color'
                            value={character.nameColor}
                            onChange={(newValue) => {
                                const newCharacter = { ...character, nameColour: newValue ?? '' };

                                onCharacterChange(newCharacter, index);
                            }}
                        />
                        <button className='delete-button' onClick={() => deleteCharacter(index)} >Delete</button>
                    </div>;
            })}
        </div>
    </Card>;
};
