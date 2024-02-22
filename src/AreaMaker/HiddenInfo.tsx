import { ReactElement, useState } from "react";
import { HiddenInfo as HiddenInfoType } from "./domain/types";

type Props = {
    onSave: (hiddenInfos: Array<HiddenInfoType>) => void;
};

export const HiddenInfo = (props: Props): ReactElement => {
    const [hiddenInfo, setHiddenInfo] = useState<Array<HiddenInfoType>>([]);

    // Hidden Info
    //      If no Hidden Info exists
    //          Display a button that can be used to create a new piece of hidden info.
    //      If a piece of hidden info exists, but is not saved.
    //          Display a "save" button
    //      If a piece of hidden info exists and is saved.
    //          Display an "Edit" button
    //          Display a "New Hidden Info" Outline Button.
    //      // When a piece of hidden info is saved, call the onSubmit callback method
    //      Loops!

    if (hiddenInfo.length === 0) {
        return <div>
            <h2>Hidden Info</h2>
            <button onClick={() => setHiddenInfo(state => [{ conditionIDs: [''], description: '' }, ...state])}>
                Create new
            </button>
        </div>;
    }

    return <div className="area-maker--form-stack">
        <h2>Hidden Info</h2>
        <div className="area-maker--form-stack">
            <label htmlFor="hidden-info-condition-ids">Hidden Info Condition IDs</label>
            <input type="text" id="hidden-info-condition-ids" />
        </div>
        <div className="area-maker--form-stack">
            <label htmlFor="hidden-info-description">Hidden Info Description</label>
            <textarea className="area-maker--text-box" id="hidden-info-description" />
        </div>
    </div>;
};
