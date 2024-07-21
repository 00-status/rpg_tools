export type Character = {
    id: string;
    name: string;
    nameColor: string;
};

export type Dialogue = {
    id: number;
    name: string;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    choices: Array<Choice>;
};

export type HiddenInfo = {
    id: string;
    conditionIDs: Array<string>;
    description: string;
};

export type HiddenInfoCondition = {
    id: string;
    name: string;
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

