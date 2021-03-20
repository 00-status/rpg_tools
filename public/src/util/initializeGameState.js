
import Events from 'Data/events';
import Parts from 'Data/parts';
import Choices from 'Data/choices';
import Choices_perks from 'Data/choices_perks';
import Perks from 'Data/perks';
import Choices_requirements from 'Data/choices_requirements';
import Requirements from 'Data/requirements';
import Items from 'Data/items';

const STARTING_HEALTH_POINTS = 100;

const initializeGameState = () => {
    const {
        events,
        parts,
        choices,
        choicesPerks,
        perks,
        choicesRequirements,
        requirements,
        items
    } = mapData();

    const associatedChoices = associateChoicesData(choices, choicesPerks, perks, choicesRequirements, requirements);
    const associatedParts = associatePartsData(parts, associatedChoices);

    const player = { healthPoints: STARTING_HEALTH_POINTS, items: {} };

    const itemsById = items.reduce((acc, item) => {
        acc[item.id] = {
            ...item
        }
        return acc;
    }, {});

    return { player, items: itemsById, events: associateEventData(events, associatedParts) };
};

const mapData = () => {
    const events = Events.map((event) => {
        return {
            id: event.id,
            title: event.title,
            parts: []
        };
    });

    const parts = Parts.map((part) => {
        return {
            id: part.id,
            eventId: part.event_id,
            title: part.title,
            description: part.description,
            choices: []
        };
    });

    const choices = Choices.map((choice) => {
        return {
            id: choice.id,
            partId: choice.part_id,
            title: choice.title,
            leadingPartId: choice.leading_part_id,
            sortOrder: choice.sort_order,
            perks: [],
            requirements: []
        };
    });

    const choicesPerks = Choices_perks.map((choicesPerks) => {
        return {
            id: choicesPerks.id,
            choiceId: choicesPerks.choice_id,
            perkId: choicesPerks.perk_id
        };
    });

    const perks = Perks.map((perk) => {
        return {
            id: perk.id,
            name: perk.name,
            perkType: perk.perk_type,
            amount: perk.amount,
            itemId: perk.item_id
        };
    });

    const choicesRequirements = Choices_requirements.map((choices_requirements) => {
        return {
            id: choices_requirements.id,
            choiceId: choices_requirements.choice_id,
            requirementId: choices_requirements.requirement_id
        };
    });

    const requirements = Requirements.map((requirement) => {
        return {
            id: requirement.id,
            name: requirement.name,
            requirementType: requirement.requirement_type,
            positiveRequirement: requirement.positive_requirement,
            amount: requirement.amount,
            itemId: requirement.item_id
        };
    });

    const items = Items.map((item) => {
        return {
            id: item.id,
            name: item.name
        };
    });

    return {
        events,
        parts,
        choices,
        choicesPerks,
        perks,
        choicesRequirements,
        requirements,
        items
    };
};

/**
 * Returns a new list of events with the associated parts attached. 
 */
const associateEventData = (events, parts) => {
    return events.reduce((acc, event) => {
        acc[event.id] = {
            ...event,
            parts: parts.filter(part => part.eventId === event.id)
        }; 
        return acc;
    }, {});
};

/**
 * Returns a list of parts with the associated choices attached.
 */
const associatePartsData = (parts, choices) => {
    return parts.map((part) => {
        return {
            ...part,
            choices: choices.filter(choice => choice.partId === part.id)
        };
    });
};

/**
 * Returns a list of choices with their associated perks and requirements.
 */
const associateChoicesData = (choices, choicesPerks, perks, choicesRequirements, requirements) => {
    return choices.map((choice) => {
        // Grab the associated perks
        const associatedPerkIds = choicesPerks.filter((choicesPerk) => {
            return choicesPerk.choiceId === choice.id;
        }).map(choicePerk => choicePerk.perkId);

        const associatedPerks = perks.filter((perk) => {
            return associatedPerkIds.find(perkId => perkId === perk.id);
        });

        // Grab the associated requirements
        const associatedRequirementIds = choicesRequirements.filter((choicesRequirement) => {
            return choicesRequirement.choiceId === choice.id;
        }).map(choiceRequirement => choiceRequirement.requirementId);
        const associatedRequirements = requirements.filter((requirement) => {
            return associatedRequirementIds.find(requirementId => requirementId === requirement.id);
        });

        return {
            ...choice,
            perks: associatedPerks,
            requirements: associatedRequirements
        };
    });
};

export { initializeGameState };
