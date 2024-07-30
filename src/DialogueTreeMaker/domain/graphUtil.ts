import { SerializedEdge, SerializedNode } from "graphology-types";
import { Dialogue } from "./types";

type DialogueMap = Map<number, { x: number, y: number }>;

export const convertDialoguesToNodes = (dialogues: Array<Dialogue>, existingDialogues: DialogueMap): Array<SerializedNode> => {
    const nodes = dialogues.map((dialogue: Dialogue) => {
        const graphDialogue = existingDialogues.get(dialogue.id);

        return {
            key: String(dialogue.id),
            node: dialogue.id,
            attributes: {
                x: graphDialogue ? graphDialogue.x : 0,
                y: graphDialogue ? graphDialogue.y : 0,
                label: dialogue.name,
                size: 20,
                color: '#d6a840'
            }
        }
    });

    return nodes;
};

export const convertDialoguesToEdges = (dialogues: Array<Dialogue>): Array<SerializedEdge> => {
    const mappedEdges = dialogues.reduce<Array<SerializedEdge>>((acc, dialogue) => {
        const edges: Array<SerializedEdge> = dialogue.choices
            .filter((choice, position) => {
                // TODO: Make this more efficient
                const firstChoiceOccurance = dialogue.choices.findIndex((innerChoice) =>
                    innerChoice.nextAreaID == choice.nextAreaID
                );
                const isUniqueChoice = firstChoiceOccurance === position;

                const doesNextDialogueExist = !!dialogues.find(dialogue => dialogue.id === Number(choice.nextAreaID));

                return doesNextDialogueExist && isUniqueChoice;
            })
            .map((choice) => {
                return {
                    key: dialogue.id + '-' + choice.nextAreaID,
                    undirected: false,
                    source: String(dialogue.id),
                    target: choice.nextAreaID,
                    attributes: { label: choice.shortDescription, type: 'arrow', size: 4, undirected: false }
                };
            });

        return [...acc, ...edges];
    }, []);

    return mappedEdges;
};
