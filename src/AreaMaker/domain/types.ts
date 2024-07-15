export type Dialogue = {
    id: string;
    name: string;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    choices: Array<Choices>;
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

export type Choice = {
    id: string;
    conditionID: string | null;
    nextAreaID: string;
    shortDescription: string;
};

