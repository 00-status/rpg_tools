import { NodeEntry, SerializedNode } from "graphology-types";
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
