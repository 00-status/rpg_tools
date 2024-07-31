import { ReactElement, useEffect, useState } from "react";

import './dialogue-maker.css';
import { Dialogue, HiddenInfo, Choice } from "../domain/types";
import { HiddenInfoList } from "./HiddenInfo/HiddenInfoList";
import { ChoicesList } from "./Choices/ChoicesList";
import { TextInput } from "../../SharedComponents/TextInput/TextInput";
import { Card } from "../../SharedComponents/Card/Card";
import { Button, ButtonTheme } from "../../SharedComponents/Button/Button";
import { TrashIcon } from "../../SharedComponents/Icons/TrashIcon";
import { Dropdown } from "../../SharedComponents/Dropdown/Dropdown";

type Props = {
    dialogue: Dialogue;
    onSave: (dialogue: Dialogue) => void;
    onDelete: () => void;
};

export const DialogueMaker = (props: Props): ReactElement => {
    const { dialogue, onSave, onDelete } = props;

    return <div className="dialogue-maker">
        <div className="dialogue-maker--title">
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
            <Dropdown onOptionSelect={(thing: string) => {}} options={[ { value: 'option_1', label: 'Option 1' }, { value: 'option_2', label: 'Option 2' } ]}/>
        </div>
        <div className="dialogue-maker--content">
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
            <div className="dialogue-maker__widgets">
                <div className="dialogue-maker__widgets--hidden-info">
                    <HiddenInfoList
                        hiddenInfos={dialogue.hiddenInfo}
                        setHiddenInfos={(hiddenInfo: Array<HiddenInfo>) => {
                            onSave({...dialogue, hiddenInfo: hiddenInfo});
                        }}
                    />
                </div>
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
    </div>;
};
