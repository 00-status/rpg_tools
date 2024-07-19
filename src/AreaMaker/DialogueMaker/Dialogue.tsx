import { ReactElement, useEffect, useState } from "react";

import './dialogue-maker.css';
import { Dialogue, HiddenInfo, Choice } from "../domain/types";
import { HiddenInfoList } from "./HiddenInfo/HiddenInfoList";
import { ChoicesList } from "./Choices/ChoicesList";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Card } from "../../SharedComponents/Card/Card";

type Props = {
    dialogue: Dialogue;
    onSave: (dialogue: Dialogue) => void;
    onDelete: () => void;
};

export const DialogueMaker = (props: Props): ReactElement => {
    const { dialogue, onSave, onDelete } = props;

    return <div className="dialogue-maker">
        <div className="dialogue-maker--title">
            <h2>{dialogue.name} | ID: {dialogue.id}</h2>
            <button onClick={onDelete} className="dialogue-maker--delete-button">Delete dialogue</button>
        </div>
        <TextInput
            id="dialogue-name"
            label="Dialogue name"
            value={dialogue.name}
            onChange={(value) => {
                onSave({...dialogue, name: value ?? ''});
            }}
        />
        <div className="dialogue-maker--content">
            <div className="dialogue-maker__description-container">
                <Card title="Description" >
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
                </Card>
                <div>
                    <HiddenInfoList
                        hiddenInfos={dialogue.hiddenInfo}
                        setHiddenInfos={(hiddenInfo: Array<HiddenInfo>) => {
                            onSave({...dialogue, hiddenInfo: hiddenInfo});
                        }}
                    />
                </div>
            </div>
            <div className="dialogue-maker__choices">
                <ChoicesList
                    choices={dialogue.choices}
                    onChange={(choices: Array<Choice>) => {
                        onSave({...dialogue, choices});
                    }}
                />
            </div>
        </div>
    </div>;
};
