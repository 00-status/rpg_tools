
import './hidden-info-item.css';
import { Button, ButtonTheme } from "../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../SharedComponents/Icons/TrashIcon";
import { HiddenInfo } from "../../domain/types";

type Props = {
    hiddenInfo: HiddenInfo;
    onDelete: (id: string) => void;
    onEdit: () => void;
};

export const HiddenInfoItem = (props: Props) => {
    const { hiddenInfo, onEdit, onDelete } = props;
    return <div className="hidden-info-item">
        <div className="hidden-info-item__description">
            {hiddenInfo.conditionIDs.map(condition => <b>{'[' + condition.name + ']'}</b>)}: {hiddenInfo.description}
        </div>
        <div className="hidden-info-item__actions">
            <Button onClick={onEdit}>Edit</Button>
            <Button onClick={() => onDelete(hiddenInfo.id)} buttonTheme={ButtonTheme.Delete}><TrashIcon /></Button>
        </div>
    </div>;
};
