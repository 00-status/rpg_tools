import { useEffect, useState } from "react";

import { HiddenInfo, HiddenInfoCondition } from "../../domain/types";
import { HiddenInfoConditions } from "./HiddenInfoConditions";
import { Modal } from "../../../SharedComponents/Modal/Modal";
import { Button } from "../../../SharedComponents/Button/Button";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSave: (hiddenInfo: HiddenInfo) => void;
};

export const AddHiddenInfoModal = (props: Props) => {
    const [hiddenInfo, setHiddenInfo] = useState<HiddenInfo>({
        id: crypto.randomUUID(),
        conditionIDs: [],
        description: ''
    });

    useEffect(() => {
        setHiddenInfo({
            id: crypto.randomUUID(),
            conditionIDs: [],
            description: ''
        });
    }, [props.isOpen]);

    return <Modal
        title={'Add Hidden Info'}
        isOpen={props.isOpen}
        onClose={props.onClose}
        footer={<Button onClick={() => props.onSave(hiddenInfo)}>Save hidden info</Button>}
    >
        <div className="hidden-info__list-item">
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
        </div>
    </Modal>;
};
