import { render } from "@testing-library/react";
import { PathsList } from "./PathsList";
import { Path } from "../domain/types";
import userEvent from "@testing-library/user-event";

describe('PathsList', () => {
    it('should display a list of paths', () => {
        const paths: Array<Path> = [
            {
                id: '1',
                conditionID: null,
                nextAreaID: 'area_library',
                shortDescription: 'Open the heavy-looking oak door.'
            },
            {
                id: '2',
                conditionID: 'item_angel_key',
                nextAreaID: 'area_angel_library',
                shortDescription: 'Unlock the heavy, angelic oak door.'
            },
        ];

        const { getByDisplayValue } = render(<PathsList paths={paths} onChange={jest.fn()} />);

        getByDisplayValue('area_library');
        getByDisplayValue('Open the heavy-looking oak door.');
        
        getByDisplayValue('item_angel_key');
        getByDisplayValue('area_angel_library');
        getByDisplayValue('Unlock the heavy, angelic oak door.');
    });

    it('should add a new path when the Add path button is pressed.', async () => {
        const paths: Array<Path> = [];

        const onChangeMock = jest.fn();
        const { getByText } = render(<PathsList paths={paths} onChange={onChangeMock} />);

        expect(onChangeMock).toHaveBeenCalledTimes(0);

        await userEvent.click(getByText('Add path'));

        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith([
            expect.objectContaining({
                conditionID: null,
                nextAreaID: '',
                shortDescription: ''
            })
        ]);
    });

    it('should call onChange when typing', async () => {
        const paths: Array<Path> = [
            {
                id: '1',
                conditionID: null,
                nextAreaID: 'area_library',
                shortDescription: 'Open the heavy-looking oak door.'
            }
        ];

        const onChangeMock = jest.fn();
        const { getByDisplayValue } = render(<PathsList paths={paths} onChange={onChangeMock} />);

        getByDisplayValue('area_library');

        expect(onChangeMock).toHaveBeenCalledTimes(0);
        await userEvent.type(getByDisplayValue('area_library'), 's');
        expect(onChangeMock).toHaveBeenCalledTimes(1);

        expect(onChangeMock).toHaveBeenCalledWith(
            [
                expect.objectContaining({
                    conditionID: null,
                    nextAreaID: 'area_librarys',
                    shortDescription: 'Open the heavy-looking oak door.'
                })
            ]
        );
    });

    it('should call onChange when deleting a Path', async () => {
        const paths: Array<Path> = [
            {
                id: '1',
                conditionID: null,
                nextAreaID: 'area_library',
                shortDescription: 'Open the heavy-looking oak door.'
            }
        ];

        const onChangeMock = jest.fn();
        const { getByText } = render(<PathsList paths={paths} onChange={onChangeMock} />);

        expect(onChangeMock).toHaveBeenCalledTimes(0);
        await userEvent.click(getByText('Delete path'));
        expect(onChangeMock).toHaveBeenCalledTimes(1);
        expect(onChangeMock).toHaveBeenCalledWith([]);
    });
});
