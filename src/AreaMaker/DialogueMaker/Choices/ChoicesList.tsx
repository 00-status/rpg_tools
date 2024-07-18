import { ReactElement } from "react";

import './choices-list.css';
import { Choice } from "../../domain/types";
import { Card } from "../../../SharedComponents/Card/Card";

type Props = {
    choices: Array<Choice>;
    onChange: (choices: Array<Choice>) => void;
};

export const ChoicesList = (props: Props): ReactElement => {
    const { choices } = props;

    const onChange = (choice: Choice|null, index: number) => {
        const choicesCopy = [...choices];

        if (!choice) {
            choicesCopy.splice(index, 1);
        } else {
            choicesCopy[index] = choice;
        }

        props.onChange(choicesCopy);
    };

    const onAddNew = () => {
        props.onChange(
            [
                ...choices,
                { id: crypto.randomUUID(), conditionID: null, nextAreaID: '', shortDescription: '' }
            ]
        );
    };

    return <Card title="Chocies" buttonName="Add choice" buttonAction={onAddNew}>
        <div className="choices-list__container">
            {choices.map((choice: Choice, index: number) => {
                return <div className="choice-list-item" key={choice.id}>
                    <input
                        type="text"
                        placeholder="Next-area ID"
                        id="choice-next-area-id"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newChoice: Choice = { ...choice, nextAreaID: newValue };
                            
                            onChange(newChoice, index);
                        }}
                        value={choice.nextAreaID}
                    />
                    <input
                        type='text'
                        placeholder="Short description"
                        id="choice-short-description"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newChoice: Choice = { ...choice, shortDescription: newValue };
                            
                            onChange(newChoice, index);
                        }}
                        value={choice.shortDescription}
                    />
                    <input
                        type="text"
                        placeholder="Condition ID"
                        id="choice-condition-id"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newChoice: Choice = { ...choice, conditionID: newValue };

                            onChange(newChoice, index);
                        }}
                        value={choice.conditionID ?? ''}
                    />
                    <button className="delete-button" onClick={() => onChange(null, index)}>Delete choice</button>
                </div>;
            })}
        </div>
    </Card>;
};
