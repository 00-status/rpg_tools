import { ReactElement, useState } from "react";

import './area-maker.css';
import { HiddenInfo } from "./HiddenInfoContainer";
import { PathsList } from "./Paths/PathsList";
import { Path } from "./domain/types";

export const AreaMaker = (): ReactElement => {
    const [paths, setPaths] = useState<Array<Path>>([]);

    return <div className="area-maker">
        <h2>Area</h2>
        <div className="area-maker--form-stack">
            <label htmlFor="area-id">Area ID</label>
            <input type="text" id="area-id" />

            <label htmlFor="area-name">Area Name</label>
            <input type="text" id="area-name" />

            <label htmlFor="area-description">Area Description</label>
            <textarea className="area-maker--text-box" id="area-description" />
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
