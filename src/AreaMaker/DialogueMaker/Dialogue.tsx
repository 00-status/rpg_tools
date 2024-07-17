import { ReactElement, useEffect, useState } from "react";

import './dialogue-maker.css';
import { Dialogue, HiddenInfo, Choice } from "../domain/types";
import { HiddenInfoList } from "./HiddenInfo/HiddenInfoList";
import { ChoicesList } from "./Choices/ChoicesList";

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
        <div className="dialogue-maker--form-inline">
            <div className="dialogue-maker--form-stack">
                <label htmlFor="dialogue-name">Dialogue name</label>
                <input type="text" id="dialogue-name" value={dialogue.name}
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';

                        onSave({...dialogue, name: newValue});
                    }}
                />
            </div>
        </div>
        <div className="dialogue-maker--content">
            <div className="dialogue-maker__description">
                <h3>Description</h3>
                <div className="dialogue-maker--description">
                    <label htmlFor="dialogue-description">Dialogue description</label>
                    <textarea
                        className="dialogue-maker--text-box"
                        id="dialogue-description"
                        value={dialogue.description}
                        onChange={(event) => {
                            const newValue = event.target.value ?? '';

                            onSave({...dialogue, description: newValue});
                        }}
                    />
                </div>
                <HiddenInfoList
                    hiddenInfos={dialogue.hiddenInfo}
                    setHiddenInfos={(hiddenInfo: Array<HiddenInfo>) => {
                        onSave({...dialogue, hiddenInfo: hiddenInfo});
                    }}
                />
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
