import { ReactElement } from "react";

import './choices-list.css';
import { Choice } from "../../domain/types";
import { Card } from "../../../SharedComponents/Card/Card";
import { TrashIcon } from "../../../SharedComponents/Icons/TrashIcon";
import { Button, ButtonTheme } from "../../../SharedComponents/Button/Button";

type Props = {
    choices: Array<Choice>;
    onChange: (choices: Array<Choice>) => void;
};

export const ChoicesList = (props: Props): ReactElement => {
    const { choices, onChange } = props;

    const updateChoice = (choice: Choice, index: number) => {
        const choicesCopy = [...choices];

        choicesCopy[index] = choice;

        onChange(choicesCopy);
    };

    const deleteChoice = (index: number) => {
        const choicesCopy = [...choices];

        choicesCopy.splice(index, 1);

        onChange(choicesCopy);
    };

    const onAddNew = () => {
        onChange(
            [
                ...choices,
                { id: crypto.randomUUID(), conditionID: null, nextDialogueID: '', shortDescription: '' }
            ]
        );
    };

    return <Card title="Choices" buttonName="Add choice" buttonAction={onAddNew}>
        <div className="choices-list__container">
            {choices.map((choice: Choice, index: number) => {
                return <div className="choice-list-item" key={choice.id}>
                    <input
                        type="text"
                        placeholder="Next-dialogue ID"
                        name="choice-next-area-id"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newChoice: Choice = { ...choice, nextDialogueID: newValue };
                            
                            updateChoice(newChoice, index);
                        }}
                        value={choice.nextDialogueID}
                    />
                    <input
                        type='text'
                        placeholder="Short description"
                        name="choice-short-description"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newChoice: Choice = { ...choice, shortDescription: newValue };
                            
                            updateChoice(newChoice, index);
                        }}
                        value={choice.shortDescription}
                    />
                    <input
                        type="text"
                        placeholder="Condition ID"
                        name="choice-condition-id"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newChoice: Choice = { ...choice, conditionID: newValue };

                            updateChoice(newChoice, index);
                        }}
                        value={choice.conditionID ?? ''}
                    />
                    <Button buttonTheme={ButtonTheme.Delete} onClick={() => deleteChoice(index)}>
                        <TrashIcon />
                    </Button>
                </div>;
            })}
        </div>
    </Card>;
};
