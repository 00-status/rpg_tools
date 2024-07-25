import { useEffect, useState } from "react";

import { Dialogue, DialogueCoordinate, DialogueTree } from "./domain/types";

type UseDialogueTree = {
    dialogueTreeID: string;
    dialogueTreeName: string;
    dialogues: Array<Dialogue>;
    dialogueCoordinates: DialogueCoordinate;
    setDialogueTreeID: (id: string) => void;
    setDialogueTreeName: (name: string) => void;
    setDialogues: (dialogues: Array<Dialogue>) => void;
    setDialogueCoordinates: (dialogueCoordinates: DialogueCoordinate) => void;
};

export const useDialgoueTree = (): UseDialogueTree => {
    const [dialogueTreeID, setDialogueTreeID] = useState<string>('tree_1');
    const [dialogueTreeName, setDialogueTreeName] = useState<string>('Tree 1');
    const [dialogues, setDialogues] = useState<Array<Dialogue>>([]);
    const [dialogueCoordinates, setDialogueCoordinates] = useState<DialogueCoordinate>(new Map());

    useEffect(() => {
        const dialogueTreeJson = localStorage.getItem('dialogueTree');

        if (dialogueTreeJson) {
            const dialogueTreeParsed: DialogueTree = JSON.parse(dialogueTreeJson);

            setDialogueTreeID(dialogueTreeParsed.id);
            setDialogueTreeName(dialogueTreeParsed.name);
            setDialogues(dialogueTreeParsed.dialogues);

            if (dialogueTreeParsed?.dialogueCoordinates) {
                setDialogueCoordinates(new Map(dialogueTreeParsed.dialogueCoordinates));
            }
        }

    }, [setDialogueTreeID, setDialogueTreeName, setDialogues]);

    useEffect(() => {
        const dialogueTree = {
            id: dialogueTreeID,
            name: dialogueTreeName,
            dialogues,
            dialogueCoordinates: Array.from(dialogueCoordinates.entries())
        };
        const serializedDialogueTree = JSON.stringify(dialogueTree);
        
        localStorage.setItem('dialogueTree', serializedDialogueTree);
    }, [dialogueTreeID, dialogueTreeName, dialogues, dialogueCoordinates]);

    return {
        dialogueTreeID,
        dialogueTreeName,
        dialogues,
        dialogueCoordinates,
        setDialogues,
        setDialogueTreeID,
        setDialogueTreeName,
        setDialogueCoordinates
    };
};
