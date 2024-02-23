import { ReactElement } from "react";

import './area-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { HiddenInfo } from "./HiddenInfoContainer";

export const AreaMaker = (): ReactElement => {
    // Create a form where the user can enter the Area's information into.
    //      Adventure ID
    //      Adventure Name
    //      Area ID
    //      Area name
    //      Description
    //      Hidden Info
    //      Points of interest
    //      Paths
    //          Lead to other areas via an ID.
    //          An ID must be entered for it to be valid, adventure_end can be used if it is the last area.
    // Create a way to make new, attached areas.
    // When Area A leads to Area B, link the two areas together in SigmaJS.

    return <Page title="RPG Tools">
        <div className="area-maker">
            <h1>Adventure Maker</h1>
            <div className="area-maker--form-stack">
                <label htmlFor="adventure-id">Adventure ID</label>
                <input type="text" id="adventure-id" />

                <label htmlFor="adventure-name">Adventure Name</label>
                <input type="text" id="adventure-name" />
            </div>
            <div>
                <h2>SigmaJS Container</h2>
            </div>
            <div className="area-maker--form-stack">
                <label htmlFor="area-id">Area ID</label>
                <input type="text" id="area-id" />

                <label htmlFor="area-name">Area Name</label>
                <input type="text" id="area-name" />

                <label htmlFor="area-description">Area Description</label>
                <textarea className="area-maker--text-box" id="area-description" />
            </div>
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
            <div className="area-maker--form-stack">
                <h2>Paths</h2>
                <div className="area-maker--form-inline">
                    <div className="area-maker--form-stack">
                        <label htmlFor="path-condition-id">Path Condition ID</label>
                        <input type="text" id="path-condition-id" />
                    </div>
                    <div className="area-maker--form-stack">
                        <label htmlFor="path-next-area-id">Path Next-area ID</label>
                        <input type="text" id="path-next-area-id" />
                    </div>
                </div>
                <div className="area-maker--form-stack">                    
                    <label htmlFor="path-short-description">Path Short Description</label>
                    <textarea className="area-maker--text-box" id="path-short-description" />
                </div>
            </div>
        </div>
    </Page>;
};
