import { ReactElement, useEffect, useState } from "react";
import { SigmaContainer } from "@react-sigma/core";
import { DirectedGraph } from "graphology";

import './adventure-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { AreaMaker } from "./AreaMaker";
import { Area } from "./domain/types";
import { convertAreasToEdges, convertAreasToNodes } from "./domain/graphUtil";
import { SerializedGraph } from "graphology-types";

export const AdventureMaker = (): ReactElement => {
    const [areas, setAreas] = useState<Array<Area>>([
        {
            id: 'area_1',
            name: 'Area 1',
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


    const serializedGraph: SerializedGraph = {
        attributes: { name: 'Adventure' },
        options: {
            allowSelfLoops: true,
            multi: false,
            type: 'directed'
        },
        nodes: convertAreasToNodes(areas),
        edges: convertAreasToEdges(areas)
    };
    const graph = DirectedGraph.from(serializedGraph);

    const createNewArea = () => {
        const newArea = {
            id: 'area_' + (areas.length + 1),
            name: 'Area ' + (areas.length + 1),
            description: '',
            hiddenInfo: [],
            pointsOfInterest: [],
            paths: []
        };

        setAreas([...areas, newArea]);
    };

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
                    <div>
                        <button onClick={createNewArea}>Create area</button>
                    </div>
                </div>
                <AreaMaker area={selectedArea} onSave={onSave}/>
            </div>
        </div>
    </Page>;
};
