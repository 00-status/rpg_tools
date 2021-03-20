
const getVisibleChoices = (choices, items) => {
    return choices.filter((choice) => {
        if (choice.requirements.length === 0) {
            return true
        }

        return choice.requirements.every((requirement) => {
            switch (requirement.requirementType) {
                case 'ITEM':
                    const hasItem = items[requirement.itemId] ?? false;
                    
                    // If the requirement is positive and the item exists, then return true (the requirement is met).
                    return requirement.positiveRequirement ? hasItem : !hasItem;
                default:
                    return false;
            }
        });
    });
};

export { getVisibleChoices };
