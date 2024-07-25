import { ReactElement, useState } from "react";
import { SigmaContainer } from "@react-sigma/core";

import './dialogue-tree-maker.css';
import { Page } from "../SharedComponents/Page/Page";
import { DialogueMaker } from "./DialogueMaker/Dialogue";
import { Dialogue } from "./domain/types";
import { DialogueTreeGraph } from "./DialogueTreeGraph";
import { TextInput } from "../SharedComponents/TextInput/TextInput";
import { useDialgoueTree } from "./useDialogueTree";

// TODO: Allow the user to select character name by colour wheel.

// Strapi - nodeJS

export const DialogueTreeMaker = (): ReactElement => {
    const { dialogues, setDialogues } = useDialgoueTree();

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

    const deleteDialogue = () => {
        if (dialogues.length === 1) {
            return;
        }

        const areasCopy = [...dialogues];
        areasCopy.splice(currentIndex, 1);
        setCurrentIndex(0);
        setDialogues(areasCopy);
    };

    const createNewDialogue = () => {
        const lastDialogueNumber = dialogues.length !== 0
            ? dialogues[dialogues.length - 1].id
            : 0;

        const newArea = {
            id: lastDialogueNumber + 1,
            name: 'Dialogue ' + (Number(lastDialogueNumber) + 1),
            description: '',
            hiddenInfo: [],
            pointsOfInterest: [],
            choices: []
        };

        setDialogues([...dialogues, newArea]);
    };

    const onDialogueClick = (areaID: number) => {
        const clickedAreaIndex = dialogues.findIndex((area: Dialogue) => {
            return area.id === areaID;
        });

        if (clickedAreaIndex === -1) {
            return;
        }

        setCurrentIndex(clickedAreaIndex);
    };

    console.log(dialogues.length);

    return <Page title="RPG Tools">
        <div className="dialogue-tree-maker">
            <div>
                <h1>Dialogue Tree Maker</h1>
                <a
                    download={"dialogue-tree.json"}
                    href={getDownloadLink()}
                >
                    Download Dialogue Tree
                </a>
            </div>
            <div className="dialogue-tree-maker__top">
                <div className="dialogue-tree-maker__top--form">
                    <TextInput id="dialogue-tree-id" label="Dialogue tree ID" value="" onChange={() => {}} />
                    <TextInput id="dialogue-tree-name" label="Dialogue tree name" value="" onChange={() => {}} />
                </div>
            </div>
            <hr className="divider" />
            <div className="dialogue-tree-maker--content">
            <div>
                <div className="dialogue-tree-maker__dialogue-tree-title">
                    <h2>Dialogue Tree</h2>
                    <button onClick={() => createNewDialogue()}>Create dialogue</button>
                </div>
                <SigmaContainer style={{ height: '300px', backgroundColor: '#3b3b40', color: '#FCFEFF' }}>
                    <DialogueTreeGraph
                        areas={dialogues}
                        onAreaClick={onDialogueClick}
                    />
                </SigmaContainer>
            </div>
                {dialogues.length > 0 ? <DialogueMaker dialogue={dialogues[currentIndex]} onSave={onSave} onDelete={deleteDialogue} /> : null}
            </div>
        </div>
    </Page>;
};
