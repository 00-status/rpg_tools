import { useEffect, useState } from "react";

import { Dialogue, DialogueTree } from "./domain/types";

type UseDialogueTree = {
    dialogueTreeID: string;
    dialogueTreeName: string;
    dialogues: Array<Dialogue>;
    setDialogues: (dialogues: Array<Dialogue>) => void;
};

export const useDialgoueTree = (): UseDialogueTree => {
    const [dialogueTreeID, setDialogueTreeID] = useState<string>('tree_1');
    const [dialogueTreeName, setDialogueTreeName] = useState<string>('Tree 1');
    const [dialogues, setDialogues] = useState<Array<Dialogue>>([]);

    useEffect(() => {
        const dialogueTreeJson = localStorage.getItem('dialogueTree');

        if (dialogueTreeJson) {
            const dialogueTreeParsed: DialogueTree = JSON.parse(dialogueTreeJson);

            setDialogueTreeID(dialogueTreeParsed.id);
            setDialogueTreeName(dialogueTreeParsed.name);
            setDialogues(dialogueTreeParsed.dialogues);
        }

    }, [setDialogueTreeID, setDialogueTreeName, setDialogues]);

    useEffect(() => {
        const dialogueTree: DialogueTree = { id: dialogueTreeID, name: dialogueTreeName, dialogues };
        const serializedDialogueTree = JSON.stringify(dialogueTree);
        
        localStorage.setItem('dialogueTree', serializedDialogueTree);
    }, [dialogueTreeID, dialogueTreeName, dialogues]);

    return {
        dialogueTreeID,
        dialogueTreeName,
        dialogues,
        setDialogues
    };
};
