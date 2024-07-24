import { SerializedEdge } from "graphology-types";
import { convertAreasToEdges, convertAreasToNodes } from "./graphUtil";
import { Dialogue } from "./types";

describe('graphUtil', () => {
    describe('convertAreasToNodes', () => {
        it('should convert areas to a list of nodes', () => {
            const areas: Array<Dialogue> = [
                {
                    id: 1,
                    name: "Area one",
                    description: 'Description one',
                    choices: [],
                    hiddenInfo: []
                },
                {
                    id: 2,
                    name: "Area two",
                    description: 'Description two',
                    choices: [],
                    hiddenInfo: []
                },
            ];

            const result = convertAreasToNodes(areas, new Map());

            expect(result).toEqual([
                {
                    key: '1',
                    node: 1,
                    attributes: { x: 0, y: 0, label: "Area one", size: 20, color: '#d6a840' }
                },
                {
                    key: '2',
                    node: 2,
                    attributes: { x: 0, y: 0, label: "Area two", size: 20, color: '#d6a840' }
                },
            ]);
        });

        it('should convert areas to a list of nodes with x and y coords provided', () => {
            const areas: Array<Dialogue> = [
                {
                    id: 1,
                    name: "Area one",
                    description: 'Description one',
                    choices: [],
                    hiddenInfo: []
                },
                {
                    id: 2,
                    name: "Area two",
                    description: 'Description two',
                    choices: [],
                    hiddenInfo: []
                },
            ];

            const coordsMap = new Map([
                [1, { x: 1, y: 2 }]
            ]);

            const result = convertAreasToNodes(areas, coordsMap);

            expect(result).toEqual([
                {
                    key: '1',
                    node: 1,
                    attributes: { x: 1, y: 2, label: "Area one", size: 20, color: '#d6a840' }
                },
                {
                    key: '2',
                    node: 2,
                    attributes: { x: 0, y: 0, label: "Area two", size: 20, color: '#d6a840' }
                },
            ]);
        });

        it('should return an empty array when areas is empty', () => {
            const result = convertAreasToNodes([], new Map());
            expect(result).toHaveLength(0);
        });
    });

    describe('convertAreasToEdges', () => {
        it('should return an edge for each choice on a node.', () => {
            const areas: Array<Dialogue> = [
                {
                    id: 1,
                    name: "Area one",
                    description: 'Description one',
                    choices: [
                        {
                            id: 'id_1',
                            conditionID: '',
                            nextAreaID: '2',
                            shortDescription: 'description 1',
                        },
                        {
                            id: 'id_2',
                            conditionID: '',
                            nextAreaID: '3',
                            shortDescription: 'description 2',
                        },
                    ],
                    hiddenInfo: []
                },
                {
                    id: 2,
                    name: "Area two",
                    description: 'Description two',
                    choices: [],
                    hiddenInfo: []
                },
                {
                    id: 3,
                    name: "Area three",
                    description: 'Description three',
                    choices: [],
                    hiddenInfo: []
                },
            ];

            const result = convertAreasToEdges(areas);

            const expected: Array<SerializedEdge> = [
                {
                    key: '1-2',
                    undirected: false,
                    source: '1',
                    target: '2',
                    attributes: [ { label: 'description 1' } ]
                },
                {
                    key: '1-3',
                    undirected: false,
                    source: '1',
                    target: '3',
                    attributes: [ { label: 'description 2' } ]
                },
            ];
            expect(result).toEqual(expected);
        });

        it('should NOT map choices that point to nodes that do not exist', () => {
            const areas: Array<Dialogue> = [
                {
                    id: 1,
                    name: "Area one",
                    description: 'Description one',
                    choices: [
                        {
                            id: 'id_1',
                            conditionID: '',
                            nextAreaID: '45',
                            shortDescription: 'description 1',
                        },
                    ],
                    hiddenInfo: []
                }
            ];

            const result = convertAreasToEdges(areas);

            expect(result).toHaveLength(0);
        });

        it('should NOT map choices that have duplicate nextAreaIDs', () => {
            const areas: Array<Dialogue> = [
                {
                    id: 1,
                    name: "Dialogue 1",
                    description: 'Description one',
                    choices: [
                        {
                            id: 'id_1',
                            conditionID: '',
                            nextAreaID: '2',
                            shortDescription: 'description 1',
                        },
                        {
                            id: 'id_2',
                            conditionID: '',
                            nextAreaID: '2',
                            shortDescription: 'description 1',
                        },
                    ],
                    hiddenInfo: []
                },
                {
                    id: 2,
                    name: "Area two",
                    description: 'Description two',
                    choices: [],
                    hiddenInfo: []
                },
            ];

            const result = convertAreasToEdges(areas);

            expect(result).toHaveLength(1);
        });

        it('should return an empty array when areas is empty.', () => {
            const result = convertAreasToEdges([]);
            expect(result).toHaveLength(0);
        });

        it('should return an empty array when each area has no choices.', () => {
            const areas: Array<Dialogue> = [
                {
                    id: 1,
                    name: "Area one",
                    description: 'Description one',
                    choices: [],
                    hiddenInfo: []
                }
            ];

            const result = convertAreasToEdges(areas);

            expect(result).toHaveLength(0);
        });
    });
});
