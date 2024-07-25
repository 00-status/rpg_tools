import { useEffect, useState } from "react";

import { Dialogue, DialogueCoordinate, DialogueTree } from "./domain/types";

type UseDialogueTree = {
    dialogueTreeID: string;
    dialogueTreeName: string;
    dialogues: Array<Dialogue>;
    dialogueCoordinates: Array<DialogueCoordinate>;
    setDialogueTreeID: (id: string) => void;
    setDialogueTreeName: (name: string) => void;
    setDialogues: (dialogues: Array<Dialogue>) => void;
    setDialogueCoordinates: (dialogueCoordinates: Array<DialogueCoordinate>) => void;
};

export const useDialgoueTree = (): UseDialogueTree => {
    const [dialogueTreeID, setDialogueTreeID] = useState<string>('tree_1');
    const [dialogueTreeName, setDialogueTreeName] = useState<string>('Tree 1');
    const [dialogues, setDialogues] = useState<Array<Dialogue>>([]);
    const [dialogueCoordinates, setDialogueCoordinates] = useState<Array<DialogueCoordinate>>([]);

    useEffect(() => {
        const dialogueTreeJson = localStorage.getItem('dialogueTree');

        if (dialogueTreeJson) {
            const dialogueTreeParsed: DialogueTree = JSON.parse(dialogueTreeJson);

            setDialogueTreeID(dialogueTreeParsed.id);
            setDialogueTreeName(dialogueTreeParsed.name);
            setDialogues(dialogueTreeParsed.dialogues);
            setDialogueCoordinates(dialogueTreeParsed?.dialogueCoordinates ?? []);
        }

    }, [setDialogueTreeID, setDialogueTreeName, setDialogues]);

    useEffect(() => {
        const dialogueTree: DialogueTree = {
            id: dialogueTreeID,
            name: dialogueTreeName,
            dialogues,
            dialogueCoordinates: dialogueCoordinates
        };
        const serializedDialogueTree = JSON.stringify(dialogueTree);
        
        localStorage.setItem('dialogueTree', serializedDialogueTree);
    }, [dialogueTreeID, dialogueTreeName, dialogues]);

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
