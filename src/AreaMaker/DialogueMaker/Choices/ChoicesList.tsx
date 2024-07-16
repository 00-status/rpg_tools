import { ReactElement } from "react";

import './choices-list.css';
import { Choice } from "../../domain/types";

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

    return <div className="choice-list">
        <h2>Choices</h2>
        {choices.map((choice: Choice, index: number) => {
            return <div className="choice-list-item" key={choice.id}>
                <input
                    placeholder="Condition ID"
                    type="text"
                    id="choice-condition-id"
                    onChange={(value) => {
                        const newValue = value.target.value ?? '';
                        const newChoice: Choice = { ...choice, conditionID: newValue };

                        onChange(newChoice, index);
                    }}
                    value={choice.conditionID ?? ''}
                />
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
                    placeholder="Short Description"
                    id="choice-short-description"
                    onChange={(value) => {
                        const newValue = value.target.value ?? '';
                        const newChoice: Choice = { ...choice, shortDescription: newValue };
                        
                        onChange(newChoice, index);
                    }}
                    value={choice.shortDescription}
                />
                <button className="delete-button" onClick={() => onChange(null, index)}>Delete choice</button>
            </div>;
        })}
        <button onClick={onAddNew}>Add choice</button>
    </div>;
};