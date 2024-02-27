import { ReactElement, useState } from "react";

import './area-maker.css';
import { HiddenInfo } from "./HiddenInfoContainer";
import { PathsList } from "./Paths/PathsList";
import { Area, Path } from "./domain/types";

type Props = {
    area: Area;
};

export const AreaMaker = (props: Props): ReactElement => {
    const { area } = props;

    const [areaID, setAreaID] = useState<string>(area.id);
    const [areaName, setAreaName] = useState<string>(area.name);
    const [areaDescription, setAreaDescription] = useState<string>(area.description);
    const [paths, setPaths] = useState<Array<Path>>(props.area.paths);

    // Track the area ID, name, and description.
    // When pressing "Save area", call an onChange event in the parent that will update the overall array of areas.

    return <div className="area-maker">
        <h2>Area</h2>
        <button>Save area</button>
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
        <hr className="divider" />
        <div className="area-maker--section">
            <HiddenInfo onSave={() => {}} />
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
        </div>
    </div>;
};
