import { ReactElement, useEffect, useState } from "react";

import './dialogue-maker.css';
import { Dialogue, HiddenInfo, Choice } from "../domain/types";
import { HiddenInfoList } from "./HiddenInfo/HiddenInfoList";
import { ChoicesList } from "./Paths/ChoicesList";

type Props = {
    dialogue: Dialogue;
    onSave: (dialogue: Dialogue) => void;
    onDelete: () => void;
};

export const DialogueMaker = (props: Props): ReactElement => {
    const { dialogue, onSave, onDelete } = props;

    const [dialogueID, setDialogueID] = useState<string>(dialogue.id);
    const [dialogueName, setDialogueName] = useState<string>(dialogue.name);
    const [dialogueDescription, setDialogueDescription] = useState<string>(dialogue.description);
    const [choices, setChoices] = useState<Array<Choice>>(props.dialogue.choices);
    const [hiddenInfos, setHiddenInfos] = useState<Array<HiddenInfo>>(props.dialogue.hiddenInfo);

    useEffect(() => {
        setDialogueID(dialogue.id);
        setDialogueName(dialogue.name);
        setDialogueDescription(dialogue.description);
        setChoices(dialogue.choices);
        setHiddenInfos(dialogue.hiddenInfo);
    }, [ dialogue, setDialogueID, setDialogueName, setDialogueDescription, setChoices, setHiddenInfos ]);

    const onSaveClick = () => {
        const updatedDialogue: Dialogue = {
            id: dialogueID,
            name: dialogueName,
            description: dialogueDescription,
            choices,
            hiddenInfo: hiddenInfos
        };

        onSave(updatedDialogue);
    };

    return <div className="dialogue-maker">
        <div className="dialogue-maker--title">
            <h2>Dialogue</h2>
            <button onClick={onSaveClick} className="dialogue-maker--title-button">Save dialogue</button>
            <button onClick={onDelete} className="dialogue-maker--delete-button">Delete dialogue</button>
        </div>
        <div className="dialogue-maker--form-inline">
            <div className="dialogue-maker--form-stack">
                <label htmlFor="dialogue-id">Dialogue ID</label>
                <input type="text" id="dialogue-id" value={dialogueID}
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';
                        setDialogueID(newValue);
                    }}
                />
            </div>
            <div className="dialogue-maker--form-stack">
                <label htmlFor="dialogue-name">Dialogue name</label>
                <input type="text" id="dialogue-name" value={dialogueName}
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';
                        setDialogueName(newValue);
                    }}
                />
            </div>
        </div>
        <div className="dialogue-maker--content">
            <div className="dialogue-maker__description">
                <h2>Description</h2>
                <div className="dialogue-maker--description">
                    <label htmlFor="dialogue-description">Dialogue description</label>
                    <textarea className="dialogue-maker--text-box" id="dialogue-description" value={dialogueDescription}
                        onChange={(event) => {
                            const newValue = event.target.value ?? '';
                            setDialogueDescription(newValue);
                        }}
                    />
                </div>
                <HiddenInfoList
                    hiddenInfos={hiddenInfos}
                    setHiddenInfos={setHiddenInfos}
                />
            </div>
            <div className="dialogue-maker__choices">
                <ChoicesList choices={choices} onChange={setChoices} />
            </div>
        </div>
    </div>;
};
