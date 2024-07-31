import { SerializedEdge } from "graphology-types";
import { convertDialoguesToEdges, convertDialoguesToNodes } from "./graphUtil";
import { Dialogue } from "./types";
import { size } from "lodash";

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

            const result = convertDialoguesToNodes(areas, new Map());

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

            const result = convertDialoguesToNodes(areas, coordsMap);

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
            const result = convertDialoguesToNodes([], new Map());
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
                            nextDialogueID: '2',
                            shortDescription: 'description 1',
                        },
                        {
                            id: 'id_2',
                            conditionID: '',
                            nextDialogueID: '3',
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

            const result = convertDialoguesToEdges(areas);

            const expected: Array<SerializedEdge> = [
                {
                    key: '1-2',
                    source: '1',
                    target: '2',
                    attributes: { label: 'description 1', size: 4, type: 'arrow', undirected: false }
                },
                {
                    key: '1-3',
                    source: '1',
                    target: '3',
                    attributes: { label: 'description 2', size: 4, type: 'arrow', undirected: false }
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
                            nextDialogueID: '45',
                            shortDescription: 'description 1',
                        },
                    ],
                    hiddenInfo: []
                }
            ];

            const result = convertDialoguesToEdges(areas);

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
                            nextDialogueID: '2',
                            shortDescription: 'description 1',
                        },
                        {
                            id: 'id_2',
                            conditionID: '',
                            nextDialogueID: '2',
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

            const result = convertDialoguesToEdges(areas);

            expect(result).toHaveLength(1);
        });

        it('should return an empty array when areas is empty.', () => {
            const result = convertDialoguesToEdges([]);
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

            const result = convertDialoguesToEdges(areas);

            expect(result).toHaveLength(0);
        });
    });
});
