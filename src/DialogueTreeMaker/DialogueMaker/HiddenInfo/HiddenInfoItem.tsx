
import './hidden-info-item.css';
import { Button, ButtonTheme } from "../../../SharedComponents/Button/Button";
import { TrashIcon } from "../../../SharedComponents/Icons/TrashIcon";
import { HiddenInfo } from "../../domain/types";

type Props = {
    hiddenInfo: HiddenInfo;
};

export const HiddenInfoItem = (props: Props) => {
    const { hiddenInfo } = props;
    return <div className="hidden-info-item">
        <div className="hidden-info-item__description">
            {hiddenInfo.conditionIDs.map(condition => <b>{'[' + condition.name + ']'}</b>)}: {hiddenInfo.description}
        </div>
        <div className="hidden-info-item__actions">
            <Button>Edit</Button>
            <Button buttonTheme={ButtonTheme.Delete}><TrashIcon /></Button>
        </div>
    </div>;
};
