import { SerializedEdge, SerializedNode } from "graphology-types";
import { Dialogue } from "./types";

type AreaMap = Map<number, { x: number, y: number }>;

export const convertAreasToNodes = (areas: Array<Dialogue>, existingAreas: AreaMap): Array<SerializedNode> => {
    const nodes = areas.map((area: Dialogue) => {
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

export const convertAreasToEdges = (areas: Array<Dialogue>): Array<SerializedEdge> => {
    const mappedEdges = areas.reduce<Array<SerializedEdge>>((acc, area) => {
        const edges: Array<SerializedEdge> = area.choices
            .filter((choice) => {
                // TODO: Make this more efficient
                return areas.find(area => area.id === Number(choice.nextAreaID));
            })
            .map((choice) => {
                return {
                    key: area.id + '-' + choice.nextAreaID,
                    undirected: false,
                    source: String(area.id),
                    target: choice.nextAreaID,
                    attributes: [{ label: choice.shortDescription }]
                };
            });

        return [...acc, ...edges];
    }, []);

    return mappedEdges;
};
