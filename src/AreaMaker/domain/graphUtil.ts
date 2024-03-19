import { SerializedEdge, SerializedNode } from "graphology-types";
import { Area } from "./types";

export const convertAreasToNodes = (areas: Array<Area>): Array<SerializedNode> => {
    const nodes = areas.map((area: Area, index: number) => {
        return {
            key: area.id,
            node: area.id,
            attributes: { x: 1 * index, y: 1 * index, label: area.name, size: 20, color: '#CC1818' }
        }
    });

    return nodes;
};

export const convertAreasToEdges = (areas: Array<Area>): Array<SerializedEdge> => {
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
