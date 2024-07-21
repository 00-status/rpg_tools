import { Dispatch, ReactElement, SetStateAction } from "react";

import './hidden-info-list.css';
import { HiddenInfo } from "../../domain/types";
import { Card } from "../../../SharedComponents/Card/Card";
import { HiddenInfoConditions } from "./HiddenInfoConditions";

type Props = {
    hiddenInfos: Array<HiddenInfo>;
    setHiddenInfos: (hiddenInfos: Array<HiddenInfo>) => void;
};

export const HiddenInfoList = (props: Props): ReactElement => {
    const { hiddenInfos, setHiddenInfos } = props;

    const onCreateNewHiddenInfo = () => {
        const newHiddenInfo = { id: crypto.randomUUID(), conditionIDs: [''], description: '' };
        setHiddenInfos([...hiddenInfos, newHiddenInfo])
    };

    const onChange = (hiddenInfo: HiddenInfo, index: number) => {
        const hiddenInfosCopy = [...hiddenInfos];
    
        hiddenInfosCopy[index] = hiddenInfo;
    
        setHiddenInfos(hiddenInfosCopy);
    }
    
    const deleteHiddenInfo = (index: number) => {
        const hiddenInfosCopy = [...hiddenInfos];
    
        hiddenInfosCopy.splice(index, 1);
    
        setHiddenInfos(hiddenInfosCopy);
    };

    return <Card title="Hidden Info" buttonName="Create hidden info" buttonAction={onCreateNewHiddenInfo} >
        <div className="hidden-info__list">
            {hiddenInfos.map((hiddenInfo, index) => {
                return <div key={hiddenInfo.id} className="hidden-info__list-item">
                    <HiddenInfoConditions conditions={[]} />
                    <textarea
                        value={hiddenInfo.description}
                        onChange={(event) => {
                            const newValue = event.target.value ?? '';

                            const newHiddenInfo = { ...hiddenInfo, description: newValue };
                            onChange(newHiddenInfo, index);
                        }}
                    />
                    <button className="delete-button" onClick={() => deleteHiddenInfo(index)}>Delete</button>
                    <hr className="divider" />
                </div>;
            })}
        </div>
    </Card>;
};
