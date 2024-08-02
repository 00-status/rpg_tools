import { useState } from "react";
import { HiddenInfo, HiddenInfoCondition } from "../../domain/types";
import { HiddenInfoConditions } from "./HiddenInfoConditions";

type Props = {
    onSave: (hiddenInfo: HiddenInfo) => void;
};

export const AddHiddenInfoForm = (props: Props) => {
    const [hiddenInfo, setHiddenInfo] = useState<HiddenInfo>({
        id: crypto.randomUUID(),
        conditionIDs: [],
        description: ''
    });

    return <div className="hidden-info__list-item">
        <HiddenInfoConditions
            conditions={hiddenInfo.conditionIDs}
            updateConditions={(newConditions: Array<HiddenInfoCondition>) => {
                const newHiddenInfo = { ...hiddenInfo, conditionIDs: newConditions };

                setHiddenInfo(newHiddenInfo);
            }}
        />
        <textarea
            value={hiddenInfo.description}
            onChange={(event) => {
                const newValue = event.target.value ?? '';

                const newHiddenInfo = { ...hiddenInfo, description: newValue };
                setHiddenInfo(newHiddenInfo);
            }}
        />
    </div>;
};
