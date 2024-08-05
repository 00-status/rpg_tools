import { Dialogue, DialogueTree, UnknownObject } from "./types";
import { SerializedMap } from "./validateDialogueTree.test";

// TOOD: We should really check the sub-properties as well here.
// At the moment, if a dialogue or dialoguecoordinate is typed incorrectly, we won't catch it here.
export const validateDialogueTree = (dialogueTree: Array<any> | UnknownObject): DialogueTree|null => {
    if (Array.isArray(dialogueTree)) {
        return null;
    }

    const hasDialogues = Array.isArray(dialogueTree.dialogues);
    const hasDialogueCoordinates = Array.isArray(dialogueTree.dialogueCoordinates);

    if (typeof dialogueTree.id === 'string'
        && typeof dialogueTree.name === 'string'
        && hasDialogues
        && hasDialogueCoordinates
    ) {
        const dialogues: Array<Dialogue> = dialogueTree.dialogues as Array<Dialogue>;
        const dialogueCoordinatesMap = new Map(dialogueTree.dialogueCoordinates as SerializedMap);

        const dialogueTreeTyped: DialogueTree = {
            id: dialogueTree.id,
            name: dialogueTree.name,
            dialogues: dialogues,
            dialogueCoordinates: dialogueCoordinatesMap
        };

        return dialogueTreeTyped;
    }

    return null;
};
