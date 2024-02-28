import { ReactElement, useEffect, useState } from "react";

import './adventure-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { SigmaContainer } from "@react-sigma/core";
import { UndirectedGraph } from "graphology";
import { AreaMaker } from "./AreaMaker";
import { Area } from "./domain/types";

export const AdventureMaker = (): ReactElement => {
    const [areas, setAreas] = useState<Array<Area>>([
        {
            id: '',
            name: '',
            description: '',
            hiddenInfo: [],
            pointsOfInterest: [],
            paths: []
        }
    ]);
    const [selectedArea, setSelectedArea] = useState<Area>(areas[0])
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Whenever the array is updated, update the graph.
    //      Create an array of nodes
    //      Create an array of edges.
    //      Feed them both into the SigmaContainer

    const onSave = (updatedArea: Area) => {
        const copiedAreas = [...areas];
        copiedAreas[currentIndex] = updatedArea;

        setAreas(copiedAreas);
    };

    useEffect(() => {
        setSelectedArea(areas[currentIndex]);
    }, [areas, currentIndex]);

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
                <AreaMaker area={selectedArea} onSave={onSave}/>
            </div>
        </div>
    </Page>;
};
