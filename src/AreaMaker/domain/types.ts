export type Dialogue = {
    id: number;
    name: string;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    choices: Array<Choice>;
};

export type HiddenInfo = {
    id: string;
    conditionIDs: Array<HiddenInfoCondition>;
    description: string;
};

export type HiddenInfoCondition = {
    id: string;
    name: string;
};

export type Choice = {
    id: string;
    conditionID: string | null;
    nextAreaID: string;
    shortDescription: string;
};

