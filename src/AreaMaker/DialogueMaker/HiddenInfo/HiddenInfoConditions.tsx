import { useState } from "react";

import './hidden-info-conditions.css';
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { HiddenInfoCondition } from "../../domain/types";
import { Pill } from "../../../SharedComponents/Pill/Pill";

type Props = {
    conditions: Array<HiddenInfoCondition>;
    updateConditions: (newConditions: Array<HiddenInfoCondition>) => void; 
};

// Clicking the pill destroys the condition.

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

    const deleteCondition = (index: number): void => {
        const newConditions = [...conditions];

        newConditions.splice(index, 1);

        updateConditions(newConditions);
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
        <div className="hidden-info-conditions__pills">
            {conditions.map((condition, index)=> <Pill onClick={() => deleteCondition(index)} >{condition.name}</Pill>)}
        </div>
    </div>;
};
