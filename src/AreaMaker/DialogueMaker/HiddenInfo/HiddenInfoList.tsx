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
        <div className="hidden-info__title">
            <h3>Hidden Info</h3>
            <button onClick={() => {
                    const newHiddenInfo = { id: crypto.randomUUID(), conditionIDs: [''], description: '' };
                    setHiddenInfos([...hiddenInfos, newHiddenInfo])
                }}
            >
                Create Hidden Info
            </button>
        </div>
        <div className="hidden-info__list">
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
        </div>
    </div>;
};
