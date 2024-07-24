import { useRef, useState } from "react";

import './hidden-info-conditions.css';
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { HiddenInfoCondition } from "../../domain/types";
import { Pill } from "../../../SharedComponents/Pill/Pill";

type Props = {
    conditions: Array<HiddenInfoCondition>;
    updateConditions: (newConditions: Array<HiddenInfoCondition>) => void; 
};

export const HiddenInfoConditions = (props: Props) => {
    const { conditions, updateConditions } = props;

    const [newConditionID, setNewConditionID] = useState<string>('');
    const [newConditionName, setNewConditionName] = useState<string>('');

    const reference = useRef<HTMLInputElement|null>(null);

    const isReadyToSubmit = !!newConditionID && !!newConditionName;

    const onAdd = () => {
        const newConditions = [...conditions];
        newConditions.push({ id: newConditionID, name: newConditionName });

        updateConditions(newConditions);

        setNewConditionID('');
        setNewConditionName('');

        reference?.current?.focus();
    };

    const deleteCondition = (index: number): void => {
        const newConditions = [...conditions];

        newConditions.splice(index, 1);

        updateConditions(newConditions);
    };

    return <div className="hidden-info-conditions">
        <div className="hidden-info-conditions__form">
            <TextInput
                ref={reference}
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
            {conditions.map((condition, index)=> <Pill key={condition.id} onClick={() => deleteCondition(index)} >{condition.name}</Pill>)}
        </div>
    </div>;
};
