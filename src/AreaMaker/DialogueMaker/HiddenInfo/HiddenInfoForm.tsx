import { ReactElement } from "react";

import './hidden-info-form.css';
import { HiddenInfo as HiddenInfoType } from "../../domain/types";
import { TextInput } from "../../../SharedComponents/TextInput/TextInput";

type Props = {
    id: string;
    conditionIDs: Array<string>;
    description: string;
    onChange: (hiddenInfo: HiddenInfoType|null) => void;
};

export const HiddenInfoForm = (props: Props): ReactElement => {
    const {id, conditionIDs, description, onChange} = props;

    return <div className="hidden-info-form">
        <div className="hidden-info-form__inputs">
            <TextInput id="hidden-info-condition-ids" label="Hidden Info Condition IDs" value={conditionIDs}
                onChange={(value) => {
                    const newValue = value ?? '';

                    const newHiddenInfo = {
                        id,
                        conditionIDs: newValue.split(','),
                        description: description
                    };

                    onChange(newHiddenInfo);
                }}
            />
            <TextInput id="hidden-info-description" label="Hidden Info Description" value={description}
                onChange={(value) => {
                    const newValue = value ?? '';

                    const newHiddenInfo = {
                        id,
                        conditionIDs: conditionIDs,
                        description: newValue
                    };

                    onChange(newHiddenInfo);
                }}
            />
        </div>
        <button className="hidden-info-form__delete-button" onClick={() => onChange(null)}>Delete</button>
    </div>;
};
