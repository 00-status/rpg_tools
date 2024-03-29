export type Area = {
    id: string;
    name: string;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    pointsOfInterest: Array<PointOfInterest>;
    paths: Array<Path>;
};

export type HiddenInfo = {
    id: string;
    conditionIDs: Array<string>;
    description: string;
};

export type PointOfInterest = {
    conditionIDs: Array<string> | null;
    name: string;
    description: string;
    type: PointOfInterestType;
};

export enum PointOfInterestType {
    social = 'social',
    item = 'item',
    combat = 'combat',
    experience = 'experience',
};

export type Path = {
    id: string;
    conditionID: string | null;
    nextAreaID: string;
    shortDescription: string;
};

