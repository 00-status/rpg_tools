import { getByText, render } from "@testing-library/react";
import { HiddenInfoList } from "./HiddenInfoList";
import userEvent from "@testing-library/user-event";
import { HiddenInfo } from "../../domain/types";

describe('HiddenInfoList', () => {
    it('should render the hidden info card', () => {
        const { getByText } = render(<HiddenInfoList hiddenInfos={[]} setHiddenInfos={jest.fn()} />);

        getByText('Hidden Info');
        getByText('Create hidden info');
    });

    it('should render a form after pressing the "create new" Button.', async () => {
        const onSaveMock = jest.fn();
        const { getByText } = render(<HiddenInfoList hiddenInfos={[]} setHiddenInfos={onSaveMock} />);

        expect(onSaveMock).toHaveBeenCalledTimes(0);
        await userEvent.click(getByText('Create hidden info'));
        expect(onSaveMock).toHaveBeenCalledTimes(1);
    });

    it('should render the passed in hidden info array as a form', async () => {
        const hiddenInfos: Array<HiddenInfo> = [
            {
                id: 'id_1',
                conditionIDs: [
                    { id: 'condition_1', name: 'Condition 1' },
                    { id: 'condition_2', name: 'Condition 2' }
                ],
                description: 'Description!'
            }
        ];
        const { getByText, getByDisplayValue, getByPlaceholderText } =render(
            <HiddenInfoList hiddenInfos={hiddenInfos} setHiddenInfos={jest.fn()} />
        );


        getByPlaceholderText('Condition ID');
        getByPlaceholderText('Condition name');
        getByText('Add condition');

        getByText('Condition 1');
        getByText('Condition 2');

        getByDisplayValue('Description!');
    });
});
