import { render } from "@testing-library/react";
import { ChoicesList } from "./ChoicesList";
import { Choice } from "../../domain/types";
import userEvent from "@testing-library/user-event";

describe('PathsList', () => {
    it('should display a list of choices', () => {
        const choices: Array<Choice> = [
            {
                id: '1',
                conditionID: null,
                nextDialogueID: 'area_library',
                shortDescription: 'Open the heavy-looking oak door.'
            },
            {
                id: '2',
                conditionID: 'item_angel_key',
                nextDialogueID: 'area_angel_library',
                shortDescription: 'Unlock the heavy, angelic oak door.'
            },
        ];

        const { getByDisplayValue } = render(<ChoicesList choices={choices} onChange={jest.fn()} />);

        getByDisplayValue('area_library');
        getByDisplayValue('Open the heavy-looking oak door.');
        
        getByDisplayValue('item_angel_key');
        getByDisplayValue('area_angel_library');
        getByDisplayValue('Unlock the heavy, angelic oak door.');
    });

    it('should add a new path when the Add path button is pressed.', async () => {
        const choices: Array<Choice> = [];

        const onChangeMock = jest.fn();
        const { getByText } = render(<ChoicesList choices={choices} onChange={onChangeMock} />);

        expect(onChangeMock).toHaveBeenCalledTimes(0);

        await userEvent.click(getByText('Add choice'));

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith([
            expect.objectContaining({
                conditionID: null,
                nextDialogueID: '',
                shortDescription: ''
            })
        ]);
    });

    it('should call onChange when typing', async () => {
        const choices: Array<Choice> = [
            {
                id: '1',
                conditionID: null,
                nextDialogueID: 'area_library',
                shortDescription: 'Open the heavy-looking oak door.'
            }
        ];

        const onChangeMock = jest.fn();
        const { getByDisplayValue } = render(<ChoicesList choices={choices} onChange={onChangeMock} />);

        getByDisplayValue('area_library');

        expect(onChangeMock).toHaveBeenCalledTimes(0);
        await userEvent.type(getByDisplayValue('area_library'), 's');
        expect(onChangeMock).toHaveBeenCalledTimes(1);

        expect(onChangeMock).toHaveBeenCalledWith(
            [
                expect.objectContaining({
                    conditionID: null,
                    nextDialogueID: 'area_librarys',
                    shortDescription: 'Open the heavy-looking oak door.'
                })
            ]
        );
    });

    it('should call onChange when deleting a Path', async () => {
        const choices: Array<Choice> = [
            {
                id: '1',
                conditionID: null,
                nextDialogueID: 'area_library',
                shortDescription: 'Open the heavy-looking oak door.'
            }
        ];

        const onChangeMock = jest.fn();
        const { getByTitle } = render(<ChoicesList choices={choices} onChange={onChangeMock} />);

        expect(onChangeMock).toHaveBeenCalledTimes(0);
        await userEvent.click(getByTitle('Delete'));
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith([]);
    });
});
