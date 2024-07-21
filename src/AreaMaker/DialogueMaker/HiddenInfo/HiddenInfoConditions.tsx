import { useState } from "react";

import './hidden-info-conditions.css';
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { HiddenInfoCondition } from "../../domain/types";

type Props = {
    conditions: Array<HiddenInfoCondition>;
    updateConditions: (newConditions: Array<HiddenInfoCondition>) => void; 
};

// TODO Convert conditionIDs from a comma-separated string to an array of strings.
//      Condition: { id: string, name: string }
// Render each condition as a pill.
// Clicking the pill destroys the condition.
// Create a mini-form to Allow the user to create new conditions.

export const HiddenInfoConditions = (props: Props) => {
    const { conditions, updateConditions } = props;

    const [newConditionID, setNewConditionID] = useState<string>('');
    const [newConditionName, setNewConditionName] = useState<string>('');

    const isReadyToSubmit = !!newConditionID && !!newConditionName;

    const onAdd = () => {
        const newConditions = [...conditions];
        newConditions.push({ id: newConditionID, name: newConditionName });

        updateConditions(newConditions);

        setNewConditionID('');
        setNewConditionName('');
    };

    return <div className="hidden-info-conditions">
        <div className="hidden-info-conditions__form">
            <TextInput
                placeholder="Condition ID"
                value={newConditionID}
                onChange={(newValue) => {
                    setNewConditionID(newValue ?? '');
                }}
            />
            <TextInput
                placeholder="Condition name"
                value={newConditionName}
                onChange={(newValue) => {
                    setNewConditionName(newValue ?? '');
                }}
            />
            <button disabled={!isReadyToSubmit} onClick={onAdd}>
                Add Condition
            </button>
        </div>
        <div>
            {conditions.map((condition) => condition.name)}
        </div>
    </div>;
};
