import { ReactElement, useState } from "react";
import { SigmaContainer } from "@react-sigma/core";

import './dialogue-tree-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { DialogueMaker } from "./DialogueMaker/Dialogue";
import { Dialogue } from "./domain/types";
import { DialogueTreeGraph } from "./DialogueTreeGraph";
import { TextInput } from "../SharedComponents/TextInput/TextInput";

export const DialogueTreeMaker = (): ReactElement => {
    const [dialogues, setDialogues] = useState<Array<Dialogue>>([
        {
            id: 'dialogue_1',
            name: 'Dialogue 1',
            description: '',
            hiddenInfo: [],
            choices: []
        }
    ]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    
    const getDownloadLink = (): string => {
        const jsonString = JSON.stringify(dialogues, null, 4);
        const file = new Blob([jsonString], { type: 'application/json' })
        const href = URL.createObjectURL(file);

        return href;
    };

    const onSave = (updatedArea: Dialogue) => {
        const copiedAreas = [...dialogues];
        copiedAreas[currentIndex] = updatedArea;

        setDialogues(copiedAreas);
    };

    const deleteArea = () => {
        if (dialogues.length === 1) {
            return;
        }

        const areasCopy = [...dialogues];
        areasCopy.splice(currentIndex, 1);
        setCurrentIndex(0);
        setDialogues(areasCopy);
    };

    const createNewArea = () => {
        let lastDialogueNumber = 1;
        if (dialogues.length !== 0) {
            const lastDialogue = dialogues[dialogues.length - 1];
            lastDialogueNumber = Number(lastDialogue.id.split('_')[1]);
        }

        const newArea = {
            id: 'dialogue_' + (Number(lastDialogueNumber) + 1),
            name: 'Dialogue ' + (Number(lastDialogueNumber) + 1),
            description: '',
            hiddenInfo: [],
            pointsOfInterest: [],
            choices: []
        };

        setDialogues([...dialogues, newArea]);
    };

    const onAreaClick = (areaID: string) => {
        const clickedAreaIndex = dialogues.findIndex((area: Dialogue) => {
            return area.id === areaID;
        });

        if (clickedAreaIndex === -1) {
            return;
        }

        setCurrentIndex(clickedAreaIndex);
    };

    return <Page title="RPG Tools">
        <div className="dialogue-tree-maker">
            <div>
                <h1>Dialogue Tree Maker</h1>
                <a
                    download={"dialogue-tree.json"}
                    href={getDownloadLink()}>
                    Download Adventure
                </a>
            </div>
            <div className="dialogue-tree-maker--form">
                <TextInput id="dialogue-tree-id" label="Dialogue tree ID" value="" onChange={() => {}} />
                <TextInput id="dialogue-tree-name" label="Dialogue tree name" value="" onChange={() => {}} />
            </div>
            <div className="dialogue-tree-maker--content">
                <div>
                    <div className="dialogue-tree-maker__dialogue-tree-title">
                        <h2>Dialogue Tree</h2>
                        <button onClick={() => createNewArea()}>Create dialogue</button>
                    </div>
                    <SigmaContainer style={{ height: '300px', backgroundColor: '#3b3b40', color: '#FCFEFF' }}>
                        <DialogueTreeGraph
                            areas={dialogues}
                            onAreaClick={onAreaClick}
                        />
                    </SigmaContainer>
                </div>
                <DialogueMaker dialogue={dialogues[currentIndex]} onSave={onSave} onDelete={deleteArea} />
            </div>
        </div>
    </Page>;
};
