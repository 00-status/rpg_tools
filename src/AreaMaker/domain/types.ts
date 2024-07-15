export type Dialogue = {
    id: string;
    name: string;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    paths: Array<Path>;
};

export type HiddenInfo = {
    id: string;
    conditionIDs: Array<string>;
    description: string;
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

