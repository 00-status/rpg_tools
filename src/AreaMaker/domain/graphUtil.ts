import { SerializedEdge, SerializedNode } from "graphology-types";
import { Dialogue } from "./types";

type AreaMap = Map<string, { x: number, y: number }>;

export const convertAreasToNodes = (areas: Array<Dialogue>, existingAreas: AreaMap): Array<SerializedNode> => {
    const nodes = areas.map((area: Dialogue) => {
        const graphArea = existingAreas.get(area.id);

        return {
            key: area.id,
            node: area.id,
            attributes: {
                x: graphArea ? graphArea.x : 0,
                y: graphArea ? graphArea.y : 0,
                label: area.name,
                size: 20,
                color: '#CC1818'
            }
        }
    });

    return nodes;
};

export const convertAreasToEdges = (areas: Array<Dialogue>): Array<SerializedEdge> => {
    const mappedEdges = areas.reduce<Array<SerializedEdge>>((acc, area) => {
        const edges: Array<SerializedEdge> = area.paths
            .filter((path) => {
                // TODO: Make this more efficient
                return areas.find(area => area.id === path.nextAreaID);
            })
            .map((path) => {
                return {
                    key: area.id + '-' + path.nextAreaID,
                    undirected: false,
                    source: area.id,
                    target: path.nextAreaID,
                    attributes: [{ label: path.shortDescription }]
                };
            });

        return [...acc, ...edges];
    }, []);

    return mappedEdges;
};
