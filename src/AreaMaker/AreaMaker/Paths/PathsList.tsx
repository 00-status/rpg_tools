import { ReactElement } from "react";

import './path-list.css';
import { Path } from "../../domain/types";

type Props = {
    paths: Array<Path>;
    onChange: (paths: Array<Path>) => void;
};

export const PathsList = (props: Props): ReactElement => {
    const { paths } = props;

    const onChange = (path: Path|null, index: number) => {
        const pathsCopy = [...paths];

        if (!path) {
            pathsCopy.splice(index, 1);
        } else {
            pathsCopy[index] = path;
        }

        props.onChange(pathsCopy);
    };

    const onAddNew = () => {
        props.onChange(
            [
                ...paths,
                { id: crypto.randomUUID(), conditionID: null, nextAreaID: '', shortDescription: '' }
            ]
        );
    };

    return <div className="path-list">
        <h2>Paths</h2>
        {paths.map((path: Path, index: number) => {
            return <div className="path-list-item" key={path.id}>
                <input
                    placeholder="Condition ID"
                    type="text"
                    id="path-condition-id"
                    onChange={(value) => {
                        const newValue = value.target.value ?? '';
                        const newPath: Path = { ...path, conditionID: newValue };

                        onChange(newPath, index);
                    }}
                    value={path.conditionID ?? ''}
                />
                <input
                    type="text"
                    placeholder="Next-area ID"
                    id="path-next-area-id"
                    onChange={(value) => {
                        const newValue = value.target.value ?? '';
                        const newPath: Path = { ...path, nextAreaID: newValue };
                        
                        onChange(newPath, index);
                    }}
                    value={path.nextAreaID}
                />
                <input
                    type='text'
                    placeholder="Short Description"
                    id="path-short-description"
                    onChange={(value) => {
                        const newValue = value.target.value ?? '';
                        const newPath: Path = { ...path, shortDescription: newValue };
                        
                        onChange(newPath, index);
                    }}
                    value={path.shortDescription}
                />
                <button className="delete-button" onClick={() => onChange(null, index)}>Delete path</button>
            </div>;
        })}
        <button onClick={onAddNew}>Add path</button>
    </div>;
};
