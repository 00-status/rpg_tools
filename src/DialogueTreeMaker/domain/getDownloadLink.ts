import { DialogueTree } from "./types";

export const getDownloadLink = (dialogueTree: DialogueTree): string => {
    const dialogueTreeSerialized = {
        ...dialogueTree,
        dialogueCoordinates: Array.from(dialogueTree.dialogueCoordinates.entries())
    };

    const jsonString = JSON.stringify(dialogueTreeSerialized, null, 4);

    const file = new Blob([jsonString], { type: 'application/json' })
    const href = URL.createObjectURL(file);

    return href;
};
