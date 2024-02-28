import { EdgeEntry, NodeEntry, SerializedNode } from "graphology-types";
import { Area } from "./types";

export const convertAreasToNodes = (areas: Array<Area>): Array<NodeEntry> => {
    const nodes = areas.map((area: Area, index: number) => {
        return {
            node: area.id,
            attributes: { x: 1, y: 1 * index, label: area.name, size: 10 }
        }
    });

    return nodes;
};

export const convertAreasToEdges = (areas: Array<Area>): Array<EdgeEntry> => {
    // graph.addEdgeWithKey("rel1", "A", "B", { label: "REL_1" });

    // For each path in an area.
    //      Create an edge with the source node being the area_id and the target node being the nextAreaId

    const mappedEdges = areas.reduce<Array<EdgeEntry>>((acc, area) => {
        const edges: Array<EdgeEntry> = area.paths.map((path) => {
            return { 
                undirected: false,
                edge: area.id + '-' + path.nextAreaID,
                source: area.id,
                target: path.nextAreaID,
                sourceAttributes: {},
                targetAttributes: {},
                attributes: [{ label: path.shortDescription }]
             };
        });

        return [...acc, ...edges];
    }, []);

    return mappedEdges;
};
