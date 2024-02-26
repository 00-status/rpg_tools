import { ReactElement } from "react";
import { Path } from "../domain/types";

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

    return <div className="area-maker--form-stack">
        <h2>Paths</h2>
        {paths.map((path: Path, index: number) => {
            return <div key={path.id}>
                <div className="area-maker--form-stack">
                    <label htmlFor="path-condition-id">Path Condition ID</label>
                    <input
                        type="text"
                        id="path-condition-id"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newPath: Path = { ...path, conditionID: newValue };

                            onChange(newPath, index);
                        }}
                        value={path.conditionID ?? ''}
                    />
                </div>
                <div className="area-maker--form-stack">
                    <label htmlFor="path-next-area-id">Path Next-area ID</label>
                    <input
                        type="text"
                        id="path-next-area-id"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newPath: Path = { ...path, nextAreaID: newValue };
                            
                            onChange(newPath, index);
                        }}
                        value={path.nextAreaID}
                    />
                </div>
                <div className="area-maker--form-stack">                    
                    <label htmlFor="path-short-description">Path Short Description</label>
                    <input
                        type='text'
                        id="path-short-description"
                        onChange={(value) => {
                            const newValue = value.target.value ?? '';
                            const newPath: Path = { ...path, shortDescription: newValue };
                            
                            onChange(newPath, index);
                        }}
                        value={path.shortDescription}
                    />
                </div>
                <button onClick={() => onChange(null, index)}>Delete path</button>
            </div>;
        })}
        <hr className="divider" />
        <button onClick={onAddNew}>Add path</button>
    </div>;
};
