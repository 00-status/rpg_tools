import { EdgeEntry, SerializedEdge } from "graphology-types";
import { convertAreasToEdges, convertAreasToNodes } from "./graphUtil";
import { Area } from "./types";

describe('graphUtil', () => {
    describe('convertAreasToNodes', () => {
        it('should convert areas to a list of node', () => {
            const areas: Array<Area> = [
                {
                    id: 'area_1',
                    name: "Area one",
                    description: 'Description one',
                    paths: [],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                },
                {
                    id: 'area_2',
                    name: "Area two",
                    description: 'Description two',
                    paths: [],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                },
            ];

            const result = convertAreasToNodes(areas);

            expect(result).toEqual([
                {
                    key: 'area_1',
                    node: 'area_1',
                    attributes: { x: 0, y: 0, label: "Area one", size: 20, color: '#CC1818' }
                },
                {
                    key: 'area_2',
                    node: 'area_2',
                    attributes: { x: 1, y: 1, label: "Area two", size: 20, color: '#CC1818' }
                },
            ]);
        });

        it('should return an empty array when areas is empty', () => {
            const result = convertAreasToNodes([]);
            expect(result).toHaveLength(0);
        });
    });

    describe('convertAreasToEdges', () => {
        it('should return an edge for each path on a node.', () => {
            const areas: Array<Area> = [
                {
                    id: 'area_1',
                    name: "Area one",
                    description: 'Description one',
                    paths: [
                        {
                            id: 'id_1',
                            conditionID: '',
                            nextAreaID: 'area_2',
                            shortDescription: 'description 1',
                        },
                        {
                            id: 'id_2',
                            conditionID: '',
                            nextAreaID: 'area_3',
                            shortDescription: 'description 2',
                        },
                    ],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                },
                {
                    id: 'area_2',
                    name: "Area two",
                    description: 'Description two',
                    paths: [],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                },
                {
                    id: 'area_3',
                    name: "Area three",
                    description: 'Description three',
                    paths: [],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                },
            ];

            const result = convertAreasToEdges(areas);

            const expected: Array<SerializedEdge> = [
                {
                    key: 'area_1-area_2',
                    undirected: false,
                    source: 'area_1',
                    target: 'area_2',
                    attributes: [ { label: 'description 1' } ]
                },
                {
                    key: 'area_1-area_3',
                    undirected: false,
                    source: 'area_1',
                    target: 'area_3',
                    attributes: [ { label: 'description 2' } ]
                },
            ];
            expect(result).toEqual(expected);
        });

        it('should NOT map paths that point to nodes that do not exist', () => {
            const areas: Array<Area> = [
                {
                    id: 'area_1',
                    name: "Area one",
                    description: 'Description one',
                    paths: [
                        {
                            id: 'id_1',
                            conditionID: '',
                            nextAreaID: 'area_45',
                            shortDescription: 'description 1',
                        },
                    ],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                }
            ];

            const result = convertAreasToEdges(areas);

            expect(result).toHaveLength(0);
        });

        it('should return an empty array when areas is empty.', () => {
            const result = convertAreasToEdges([]);
            expect(result).toHaveLength(0);
        });

        it('should return an empty array when each area has no paths.', () => {
            const areas: Array<Area> = [
                {
                    id: 'area_1',
                    name: "Area one",
                    description: 'Description one',
                    paths: [],
                    hiddenInfo: [],
                    pointsOfInterest: [],
                }
            ];

            const result = convertAreasToEdges(areas);

            expect(result).toHaveLength(0);
        });
    });
});
