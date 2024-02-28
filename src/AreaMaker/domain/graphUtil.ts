import { SerializedEdge, SerializedNode } from "graphology-types";
import { Area } from "./types";

export const convertAreasToNodes = (areas: Array<Area>): Array<SerializedNode> => {
    const nodes = areas.map((area: Area, index: number) => {
        return {
            key: area.id,
            node: area.id,
            attributes: { x: 1, y: 1 * index, label: area.name, size: 10 }
        }
    });

    return nodes;
};

export const convertAreasToEdges = (areas: Array<Area>): Array<SerializedEdge> => {
    const mappedEdges = areas.reduce<Array<SerializedEdge>>((acc, area) => {
        const edges: Array<SerializedEdge> = area.paths.map((path) => {
            return {
                key: area.id + '-' + path.nextAreaID,
                undirected: false,
                source: area.id,
                target: path.nextAreaID,
                attributes: [{ label: path.shortDescription }]
             };
        });

        // TODO: Filter out edges that point to non-existant nodes.

        return [...acc, ...edges];
    }, []);

    return mappedEdges;
};
