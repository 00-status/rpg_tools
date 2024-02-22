type Area = {
    id: string;
    name: string;
    description: string;
    hiddenInfo: Array<HiddenInfo>;
    pointsOfInterest: Array<PointOfInterest>;
    paths: Array<Path>;
};

type HiddenInfo = {
    conditionIDs: Array<string>;
    description: string;
};

type PointOfInterest = {
    conditionIDs: Array<string> | null;
    name: string;
    description: string;
    type: PointOfInterestType;
};

enum PointOfInterestType {
    social = 'social',
    item = 'item',
    combat = 'combat',
    experience = 'experience',
};

type Path = {
    conditionID: string | null;
    nextAreaID: string;
    shortDescription: string;
};

