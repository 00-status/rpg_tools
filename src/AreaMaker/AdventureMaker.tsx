import { ReactElement } from "react";

import './adventure-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { SigmaContainer } from "@react-sigma/core";
import { UndirectedGraph } from "graphology";
import { AreaMaker } from "./AreaMaker";

export const AdventureMaker = (): ReactElement => {
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

    // Instantiate Paths array in the parent using useState
    // Pass Paths and setPaths into PathList component.
    // When the "Save" button is pressed, call setPaths
    // Path form should be a one-liner

    const graph = new UndirectedGraph();
    graph.addNode("A", { x: 0, y: 0, label: "Node A", size: 10 });
    graph.addNode("B", { x: 1, y: 1, label: "Node B", size: 10 });
    graph.addEdgeWithKey("rel1", "A", "B", { label: "REL_1" });

    return <Page title="RPG Tools">
        <div className="adventure-maker">
            <h1>Adventure Maker</h1>
            <div className="area-maker--form-stack">
                <label htmlFor="adventure-id">Adventure ID</label>
                <input type="text" id="adventure-id" />

                <label htmlFor="adventure-name">Adventure Name</label>
                <input type="text" id="adventure-name" />
            </div>
            <div className="adventure-maker--content">
                <div className="sigma-container">
                    <h2>SigmaJS Container</h2>
                    <SigmaContainer style={{ height: '500px' }} graph={graph} />
                    <div>buttons</div>
                </div>
                <AreaMaker />
            </div>
        </div>
    </Page>;
};
