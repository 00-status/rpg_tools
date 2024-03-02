import { ReactElement, useEffect, useState } from "react";
import { SigmaContainer } from "@react-sigma/core";

import './adventure-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { AreaMaker } from "./AreaMaker";
import { Area } from "./domain/types";
import { AdventureGraph } from "./AdventureGraph";

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

    const onSave = (updatedArea: Area) => {
        const copiedAreas = [...areas];
        copiedAreas[currentIndex] = updatedArea;

        setAreas(copiedAreas);
    };

    useEffect(() => {
        setSelectedArea(areas[currentIndex]);
    }, [areas, currentIndex]);

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

    const onAreaClick = (areaID: string) => {
        const clickedAreaIndex = areas.findIndex((area: Area) => {
            return area.id === areaID;
        });

        if (clickedAreaIndex === -1) {
            return;
        }

        setCurrentIndex(clickedAreaIndex);
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
                    <SigmaContainer style={{ height: '500px' }}>
                        <AdventureGraph areas={areas} onAreaClick={onAreaClick} />
                    </SigmaContainer>
                    <div>
                        <button onClick={createNewArea}>Create area</button>
                    </div>
                </div>
                <AreaMaker area={selectedArea} onSave={onSave}/>
            </div>
        </div>
    </Page>;
};
