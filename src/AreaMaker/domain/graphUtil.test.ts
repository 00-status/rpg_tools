import { convertAreasToNodes } from "./graphUtil";
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
                    node: 'area_1',
                    attributes: { x: 1, y: 0, label: "Area one", size: 10 }
                },
                {
                    node: 'area_2',
                    attributes: { x: 1, y: 1, label: "Area two", size: 10 }
                },
            ]);
        });

        it('should return an empty array when areas is empty', () => {
            const result = convertAreasToNodes([]);
            expect(result).toHaveLength(0);
        });
    });
});
