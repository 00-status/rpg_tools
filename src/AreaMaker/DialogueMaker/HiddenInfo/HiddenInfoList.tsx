import { Dispatch, ReactElement, SetStateAction } from "react";

import './hidden-info-list.css';
import { HiddenInfo } from "../../domain/types";
import { HiddenInfoForm } from "./HiddenInfoForm";

type Props = {
    hiddenInfos: Array<HiddenInfo>;
    setHiddenInfos: (hiddenInfos: Array<HiddenInfo>) => void;
};

export const HiddenInfoList = (props: Props): ReactElement => {
    const { hiddenInfos, setHiddenInfos } = props;

    return <div className="hidden-info">
        <hr className="divider" />
        {hiddenInfos.map((hiddenInfo, index) => {
            return <HiddenInfoForm
                key={hiddenInfo.id}
                id={hiddenInfo.id}
                conditionIDs={hiddenInfo.conditionIDs}
                description={hiddenInfo.description}
                onChange={(hiddenInfo: HiddenInfo|null) => {
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
            setHiddenInfos([...hiddenInfos, { id: crypto.randomUUID(), conditionIDs: [''], description: '' }])
        }}>
            Create Hidden Info
        </button>
    </div>;
};
