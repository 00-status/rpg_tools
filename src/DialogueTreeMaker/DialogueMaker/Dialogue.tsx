import { ReactElement, useState } from "react";

import './dialogue-maker.css';
import { Dialogue, Choice } from "../domain/types";
import { ChoicesList } from "./Choices/ChoicesList";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Card } from "../../SharedComponents/Card/Card";
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";
import { Dropdown } from "../../SharedComponents/Dropdown/Dropdown";
import { useCharacters } from "../../CharacterMaker";
import { AddHiddenInfoModal } from "./HiddenInfo/AddHiddenInfoModal";
import { HiddenInfoItem } from "./HiddenInfo/HiddenInfoItem";

type Props = {
    dialogue: Dialogue;
    onSave: (dialogue: Dialogue) => void;
    onDelete: () => void;
};

export const DialogueMaker = (props: Props): ReactElement => {
    const { dialogue, onSave, onDelete } = props;

    const [isHiddenInfoModalOpen, setIsHiddenInfoModalOpen] = useState<boolean>(false);

    const { characters } = useCharacters();

    const characterOptions = characters
        .map((character) => {
            return { label: character.name, value: character.id }
        });
    characterOptions.unshift({label: '', value: 'default'});

    const deleteHiddenInfo = (hiddenInfoID: string) => {
        const hiddenInfoToDelete = dialogue.hiddenInfo.findIndex((hiddenInfo) => {
            return hiddenInfo.id === hiddenInfoID;
        });

        if (hiddenInfoToDelete === -1) {
            return;
        }

        const hiddenInfosCopy = [...dialogue.hiddenInfo];
        hiddenInfosCopy.splice(hiddenInfoToDelete, 1);

        onSave({ ...dialogue, hiddenInfo: hiddenInfosCopy });
    };

    return <>
        <div className="dialogue-maker">
            <div className="dialogue-maker__title">
                <h2>{dialogue.name}</h2>
                <Button buttonTheme={ButtonTheme.Delete} onClick={onDelete}>
                    <TrashIcon /> Delete dialogue
                </Button>
            </div>
            <div className="dialogue-maker__form">
                <TextInput
                    id="dialogue-id"
                    label="Dialogue ID"
                    value={dialogue.id}
                    readonly
                />
                <TextInput
                    id="dialogue-name"
                    label="Dialogue name"
                    value={dialogue.name}
                    onChange={(value) => {
                        onSave({...dialogue, name: value ?? ''});
                    }}
                />
                <Dropdown
                    id="character_dropdown"
                    label="Character"
                    defaultValue={dialogue.character ? dialogue.character.id : 'default'}
                    options={characterOptions}
                    onOptionSelect={(selectedOptionID: string) => {
                        const selectedCharacter = characters.find((character) => {
                            return character.id === selectedOptionID
                        });

                        if (!selectedCharacter) {
                            return;
                        }

                        onSave({...dialogue, character: selectedCharacter});
                    }}
                />
            </div>
            <div className="dialogue-maker__content">
                <Card
                    title="Description"
                    buttonName="Add hidden info"
                    buttonAction={() => setIsHiddenInfoModalOpen(true)}
                >
                    <div className="dialogue-maker__description">
                        <label htmlFor="dialogue-description">Dialogue description</label>
                        <textarea
                            className="dialogue-maker__text-area"
                            id="dialogue-description"
                            value={dialogue.description}
                            onChange={(event) => {
                                const newValue = event.target.value ?? '';

                                onSave({...dialogue, description: newValue});
                            }}
                        />
                    </div>
                    <div className="dialogue-maker__description--hidden-info">
                        {dialogue.hiddenInfo.map((hiddenInfo) => {
                            return <HiddenInfoItem
                                key={hiddenInfo.id}
                                hiddenInfo={hiddenInfo}
                                onDelete={deleteHiddenInfo}
                            />;
                        })}
                    </div>
                </Card>
                <div className="dialogue-maker__widgets">
                    <div className="dialogue-maker__widgets--choices">
                        <ChoicesList
                            choices={dialogue.choices}
                            onChange={(choices: Array<Choice>) => {
                                onSave({...dialogue, choices});
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
        <AddHiddenInfoModal
            isOpen={isHiddenInfoModalOpen}
            onClose={() => setIsHiddenInfoModalOpen(false)}
            onSave={(hiddenInfo) => {
                const newHiddenInfos = [ ...dialogue.hiddenInfo, hiddenInfo ];

                onSave({ ...dialogue, hiddenInfo: newHiddenInfos });
                setIsHiddenInfoModalOpen(false);
            }}
        />
    </>;
};
