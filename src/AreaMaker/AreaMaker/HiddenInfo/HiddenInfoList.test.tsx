import { render } from "@testing-library/react";
import { HiddenInfoList } from "./HiddenInfoList";
import userEvent from "@testing-library/user-event";
import { HiddenInfo } from "../../domain/types";

describe('HiddenInfoList', () => {
    it('should render a "Create new" button when there are no Hidden Infos created yet.', () => {
        const { getByText } = render(<HiddenInfoList hiddenInfos={[]} setHiddenInfos={jest.fn()} />);

        getByText('Hidden Info');
        getByText('Create Hidden Info');
    });

    it('should render a form after pressing the "create new" Button.', async () => {
        const onSaveMock = jest.fn();
        const { getByText } = render(<HiddenInfoList hiddenInfos={[]} setHiddenInfos={onSaveMock} />);

        expect(onSaveMock).toHaveBeenCalledTimes(0);
        await userEvent.click(getByText('Create Hidden Info'));
        expect(onSaveMock).toHaveBeenCalledTimes(1);
    });

    it('should render the passed in hidden info array as a form', async () => {
        const hiddenInfos: Array<HiddenInfo> = [
            {
                id: 'id_1',
                conditionIDs: ['condition_1', 'condition_2'],
                description: 'descripting_things'
            }
        ];
        const { getByLabelText, getByDisplayValue } =render(
            <HiddenInfoList hiddenInfos={hiddenInfos} setHiddenInfos={jest.fn()} />
        );

        getByLabelText('Hidden Info Condition IDs');
        getByLabelText('Hidden Info Description');

        getByDisplayValue('condition_1,condition_2');
        getByDisplayValue('descripting_things');
    });
});
