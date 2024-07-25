import { SerializedEdge, SerializedNode } from "graphology-types";
import { Dialogue } from "./types";

type AreaMap = Map<number, { x: number, y: number }>;

export const convertAreasToNodes = (dialogues: Array<Dialogue>, existingAreas: AreaMap): Array<SerializedNode> => {
    const nodes = dialogues.map((area: Dialogue) => {
        const graphArea = existingAreas.get(area.id);

        return {
            key: String(area.id),
            node: area.id,
            attributes: {
                x: graphArea ? graphArea.x : 0,
                y: graphArea ? graphArea.y : 0,
                label: area.name,
                size: 20,
                color: '#d6a840'
            }
        }
    });

    return nodes;
};

export const convertAreasToEdges = (dialogues: Array<Dialogue>): Array<SerializedEdge> => {
    const mappedEdges = dialogues.reduce<Array<SerializedEdge>>((acc, dialogue) => {
        const edges: Array<SerializedEdge> = dialogue.choices
            .filter((choice, position) => {
                // TODO: Make this more efficient
                const firstChoiceOccurance = dialogue.choices.findIndex((innerChoice) =>
                    innerChoice.nextAreaID == choice.nextAreaID
                );
                const isUniqueChoice = firstChoiceOccurance === position;

                const doesNextAreaExist = !!dialogues.find(dialogue => dialogue.id === Number(choice.nextAreaID));

                return doesNextAreaExist && isUniqueChoice;
            })
            .map((choice) => {
                return {
                    key: dialogue.id + '-' + choice.nextAreaID,
                    undirected: false,
                    source: String(dialogue.id),
                    target: choice.nextAreaID,
                    attributes: [{ label: choice.shortDescription }]
                };
            });

        return [...acc, ...edges];
    }, []);

    return mappedEdges;
};
