import { ReactElement, useEffect, useState } from "react";

import './area-maker.css';
import { Area, HiddenInfo, Path } from "../domain/types";
import { HiddenInfoList } from "./HiddenInfo/HiddenInfoList";
import { PathsList } from "./Paths/PathsList";

type Props = {
    area: Area;
    onSave: (area: Area) => void;
    onDelete: () => void;
};

export const AreaMaker = (props: Props): ReactElement => {
    const { area, onSave, onDelete } = props;

    const [areaID, setAreaID] = useState<string>(area.id);
    const [areaName, setAreaName] = useState<string>(area.name);
    const [areaDescription, setAreaDescription] = useState<string>(area.description);
    const [paths, setPaths] = useState<Array<Path>>(props.area.paths);
    const [hiddenInfos, setHiddenInfos] = useState<Array<HiddenInfo>>(props.area.hiddenInfo);

    useEffect(() => {
        setAreaID(area.id);
        setAreaName(area.name);
        setAreaDescription(area.description);
        setPaths(area.paths);
        setHiddenInfos(area.hiddenInfo);
    }, [ area, setAreaID, setAreaName, setAreaDescription, setPaths, setHiddenInfos ]);

    const onSaveClick = () => {
        const updatedArea: Area = {
            id: areaID,
            name: areaName,
            description: areaDescription,
            paths,
            hiddenInfo: hiddenInfos
        };

        onSave(updatedArea);
    };

    return <div className="area-maker">
        <div className="area-maker--title">
            <h2>Area</h2>
            <button onClick={onSaveClick} className="area-maker--title-button">Save area</button>
            <button onClick={onDelete} className="area-maker--delete-button">Delete area</button>
        </div>
        <div className="area-maker--form-inline">
            <div className="area-maker--form-stack">
                <label htmlFor="area-id">Area ID</label>
                <input type="text" id="area-id" value={areaID}
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';
                        setAreaID(newValue);
                    }}
                />
            </div>
            <div className="area-maker--form-stack">
                <label htmlFor="area-name">Area Name</label>
                <input type="text" id="area-name" value={areaName}
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';
                        setAreaName(newValue);
                    }}
                />
            </div>
        </div>
        <div className="area-maker--content">
            <div className="area-maker__description">
                <h2>Description</h2>
                <div className="area-maker--description">
                    <label htmlFor="area-description">Area Description</label>
                    <textarea className="area-maker--text-box" id="area-description" value={areaDescription}
                        onChange={(event) => {
                            const newValue = event.target.value ?? '';
                            setAreaDescription(newValue);
                        }}
                    />
                </div>
                <HiddenInfoList
                    hiddenInfos={hiddenInfos}
                    setHiddenInfos={setHiddenInfos}
                />
            </div>
            <div className="area-maker__choices">
                <PathsList paths={paths} onChange={setPaths} />
            </div>
        </div>
    </div>;
};
