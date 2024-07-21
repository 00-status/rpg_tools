import { useState } from "react";
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";
import { HiddenInfoCondition } from "../../domain/types";

type Props = {
    conditions: Array<HiddenInfoCondition>;
};

// TODO Convert conditionIDs from a comma-separated string to an array of strings.
//      Condition: { id: string, name: string }
// Render each condition as a pill.
// Clicking the pill destroys the condition.
// Create a mini-form to Allow the user to create new conditions.

export const HiddenInfoConditions = (props: Props) => {
    const { conditions } = props;

    const [newConditionID, setNewConditionID] = useState<string>('');
    const [newConditionName, setNewConditionName] = useState<string>('');

    const isReadyToSubmit = !!newConditionID && !!newConditionName;

    return <div>
        <div>
            <TextInput
                placeholder="Condition ID"
                value={newConditionName}
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
            <button disabled={!isReadyToSubmit}>Create Condition</button>
        </div>
        <div>
            {conditions.map((condition) => condition.name)}
        </div>
    </div>;
};
