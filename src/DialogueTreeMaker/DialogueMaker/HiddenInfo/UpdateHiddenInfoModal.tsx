import { useEffect, useState } from "react";

import './update-hidden-info-modal.css';
import { HiddenInfo, HiddenInfoCondition } from "../../domain/types";
import { HiddenInfoConditions } from "./HiddenInfoConditions";
import { Modal } from "../../../SharedComponents/Modal/Modal";
import { Button } from "../../../SharedComponents/Button/Button";

type Props = {
    hiddenInfoToEdit?: HiddenInfo;
    isOpen: boolean;
    onClose: () => void;
    onSave: (hiddenInfo: HiddenInfo) => void;
};

export const UpdateHiddenInfoModal = (props: Props) => {
    const { hiddenInfoToEdit, isOpen, onClose, onSave} = props;

    const [hiddenInfo, setHiddenInfo] = useState<HiddenInfo>(hiddenInfoToEdit
        ? hiddenInfoToEdit
        : { id: crypto.randomUUID(), conditionIDs: [], description: '' }
    );

    useEffect(() => {
        setHiddenInfo(hiddenInfoToEdit
            ? hiddenInfoToEdit
            : { id: crypto.randomUUID(), conditionIDs: [], description: '' }
        );
    }, [isOpen]);

    return <Modal
        title={'Add Hidden Info'}
        isOpen={isOpen}
        onClose={onClose}
        footer={<Button onClick={() => onSave(hiddenInfo)}>Save hidden info</Button>}
    >
        <div className="add-hidden-info-modal">
            <HiddenInfoConditions
                conditions={hiddenInfo.conditionIDs}
                updateConditions={(newConditions: Array<HiddenInfoCondition>) => {
                    const newHiddenInfo = { ...hiddenInfo, conditionIDs: newConditions };

                    setHiddenInfo(newHiddenInfo);
                }}
            />
            <textarea
                className="add-hidden-info-modal__description"
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