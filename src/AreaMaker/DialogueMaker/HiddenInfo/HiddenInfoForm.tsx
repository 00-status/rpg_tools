import { ReactElement } from "react";

import './hidden-info-form.css';
import { HiddenInfo as HiddenInfoType } from "../domain/types";

type Props = {
    id: string;
    conditionIDs: Array<string>;
    description: string;
    onChange: (hiddenInfo: HiddenInfoType|null) => void;
};

export const HiddenInfoForm = (props: Props): ReactElement => {
    const {id, conditionIDs, description, onChange} = props;

    return <div className="hidden-info-form">
        <div className="area-maker--form-inline">
            <div className="area-maker--form-stack">
                <label htmlFor="hidden-info-condition-ids">Hidden Info Condition IDs</label>
                <input
                    type="text"
                    id="hidden-info-condition-ids"
                    value={conditionIDs}
                    onChange={(value) => {
                        const newValue = value.target.value ?? '';

                        const newHiddenInfo = {
                            id,
                            conditionIDs: newValue.split(','),
                            description: description
                        };

                        onChange(newHiddenInfo);
                    }}
                />
            </div>
        </div>
        <div className="area-maker--form-stack">
            <label htmlFor="hidden-info-description">Hidden Info Description</label>
            <textarea
                className="area-maker--text-box"
                id="hidden-info-description"
                value={description}
                onChange={(value) => {
                    const newValue = value.target.value ?? '';

                    const newHiddenInfo = {
                        id,
                        conditionIDs: conditionIDs,
                        description: newValue
                    };

                    onChange(newHiddenInfo);
                }}
            />
        </div>
        <button className="hidden-info-form--delete-button" onClick={() => onChange(null)}>Delete</button>
    </div>;
};
