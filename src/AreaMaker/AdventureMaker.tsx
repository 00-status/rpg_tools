import { ReactElement, useState } from "react";
import { SigmaContainer } from "@react-sigma/core";

import './adventure-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { DialogueMaker } from "./AreaMaker/Dialogue";
import { Dialogue } from "./domain/types";
import { AdventureGraph } from "./AdventureGraph";

export const AdventureMaker = (): ReactElement => {
    const [areas, setAreas] = useState<Array<Dialogue>>([
        {
            id: 'area_1',
            name: 'Area 1',
            description: '',
            hiddenInfo: [],
            choices: []
        }
    ]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const downloadURL = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(areas))}`

    const getDownloadLink = (): string => {
        const jsonString = JSON.stringify(areas, null, 4);
        const file = new Blob([jsonString], { type: 'application/json' })
        const href = URL.createObjectURL(file);

        return href;
    };

    const onSave = (updatedArea: Dialogue) => {
        const copiedAreas = [...areas];
        copiedAreas[currentIndex] = updatedArea;

        setAreas(copiedAreas);
    };

    const deleteArea = () => {
        if (areas.length === 1) {
            return;
        }

        const areasCopy = [...areas];
        areasCopy.splice(currentIndex, 1);
        setCurrentIndex(0);
        setAreas(areasCopy);
    };

    const createNewArea = () => {
        const newArea = {
            id: 'area_' + (Math.random().toString(36).slice(2, 7)),
            name: 'Area ' + (areas.length + 1),
            description: '',
            hiddenInfo: [],
            pointsOfInterest: [],
            choices: []
        };

        setAreas([...areas, newArea]);
    };

    const onAreaClick = (areaID: string) => {
        const clickedAreaIndex = areas.findIndex((area: Dialogue) => {
            return area.id === areaID;
        });

        if (clickedAreaIndex === -1) {
            return;
        }

        setCurrentIndex(clickedAreaIndex);
    };

    return <Page title="RPG Tools">
        <div className="adventure-maker">
            <div>
                <h1>Adventure Maker</h1>
                <a
                    download={"adventure.json"}
                    href={getDownloadLink()}>
                    Download Adventure
                </a>
            </div>
            <div className="adventure-maker--container">
                <div className="area-maker--form-stack">
                    <label htmlFor="adventure-id">Adventure ID</label>
                    <input type="text" id="adventure-id" />
                </div>
                <div className="area-maker--form-stack">
                    <label htmlFor="adventure-name">Adventure Name</label>
                    <input type="text" id="adventure-name" />
                </div>
            </div>
            <div className="adventure-maker--content">
                <div>
                    <div className="adventure-maker__dialogue-tree-title">
                        <h2>Dialogue Tree</h2>
                        <button onClick={() => createNewArea()}>Create dialogue</button>
                    </div>
                    <SigmaContainer style={{ height: '300px', backgroundColor: '#3b3b40', color: '#FCFEFF' }}>
                        <AdventureGraph
                            areas={areas}
                            onAreaClick={onAreaClick}
                        />
                    </SigmaContainer>
                </div>
                <DialogueMaker dialogue={areas[currentIndex]} onSave={onSave} onDelete={deleteArea} />
            </div>
        </div>
    </Page>;
};
