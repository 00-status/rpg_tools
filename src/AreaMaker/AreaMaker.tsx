import { ReactElement, useEffect, useState } from "react";

import './area-maker.css';
import { HiddenInfoList } from "./HiddenInfo/HiddenInfoList";
import { PathsList } from "./Paths/PathsList";
import { Area, HiddenInfo, Path } from "./domain/types";

type Props = {
    area: Area;
    onSave: (area: Area) => void;
};

export const AreaMaker = (props: Props): ReactElement => {
    const { area, onSave } = props;

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
            hiddenInfo: hiddenInfos,
            pointsOfInterest: []
        };

        onSave(updatedArea);
    };

    return <div className="area-maker">
        <div className="area-maker--title">
            <h2>Area</h2>
            <button onClick={onSaveClick} className="area-maker--title-button">Save area</button>
        </div>
        <div className="area-maker--form-inline">
            <div className="area-maker--form-stack">
                <label htmlFor="area-id">Area ID</label>
                <input
                    type="text"
                    id="area-id"
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';
                        setAreaID(newValue);
                    }}
                    value={areaID}
                />
            </div>
            <div className="area-maker--form-stack">
                <label htmlFor="area-name">Area Name</label>
                <input
                    type="text"
                    id="area-name"
                    onChange={(event) => {
                        const newValue = event.target.value ?? '';
                        setAreaName(newValue);
                    }}
                    value={areaName}
                />
            </div>
        </div>
        <div className="area-maker--description">
            <label htmlFor="area-description">Area Description</label>
            <textarea
                className="area-maker--text-box"
                id="area-description"
                onChange={(event) => {
                    const newValue = event.target.value ?? '';
                    setAreaDescription(newValue);
                }}
                value={areaDescription}
            />
        </div>
        <PathsList paths={paths} onChange={setPaths} />
        <HiddenInfoList
            hiddenInfos={hiddenInfos}
            setHiddenInfos={setHiddenInfos}
        />
        <div className="area-maker--point-of-interest-container">
            <h2>Points of Interest (POI)</h2>
            <div className="area-maker--form-inline">
                <div className="area-maker--form-stack">
                    <label htmlFor="poi-condition-ids">POI Condition IDs</label>
                    <input type="text" id="poi-condition-ids" />
                </div>
                <div className="area-maker--form-stack">
                    <label htmlFor="poi-name">POI Name</label>
                    <input type="text" id="poi-name" />
                </div>
                <div className="area-maker--form-stack">
                    {/* TODO: Make this a dropdown */}
                    <label htmlFor="poi-type">POI Type</label>
                    <input type="text" id="poi-type" />
                </div>
            </div>
            <div className="area-maker--form-stack">
                <label htmlFor="poi-description">POI Description</label>
                <textarea className="area-maker--text-box" id="poi-description" />
            </div>
        </div>
    </div>;
};
