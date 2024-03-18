import { ReactElement, useState } from "react";

import './hidden-info-container.css';
import { HiddenInfo as HiddenInfoType } from "../domain/types";
import { HiddenInfoForm } from "./HiddenInfoForm";

type Props = {
    onSave: (hiddenInfos: Array<HiddenInfoType>) => void;
};

export const HiddenInfo = (props: Props): ReactElement => {
    const [hiddenInfos, setHiddenInfos] = useState<Array<HiddenInfoType>>([]);

    return <div className="hidden-info-container">
        <div className="hidden-info-container--title">
            <h2>Hidden Info</h2>
            <button className="hidden-info-container--title-button" onClick={() => props.onSave(hiddenInfos)}>
                Save
            </button>
        </div>
        {hiddenInfos.map((hiddenInfo, index) => {
            return <HiddenInfoForm
                key={hiddenInfo.id}
                id={hiddenInfo.id}
                conditionIDs={hiddenInfo.conditionIDs}
                description={hiddenInfo.description}
                onChange={(hiddenInfo: HiddenInfoType|null) => {
                    const hiddenInfosCopy = [...hiddenInfos];

                    if (!hiddenInfo) {
                        hiddenInfosCopy.splice(index, 1);
                    } else {
                        hiddenInfosCopy[index] = hiddenInfo;
                    }

                    setHiddenInfos(hiddenInfosCopy);
                }}
            />
        })}
        <button onClick={() => {
            setHiddenInfos(state => [
                ...state,
                { id: crypto.randomUUID(), conditionIDs: [''], description: '' }
            ]);
        }}>
            Create new
        </button>
    </div>;
};
