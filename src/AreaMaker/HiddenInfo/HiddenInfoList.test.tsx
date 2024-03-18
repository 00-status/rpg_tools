import { render } from "@testing-library/react";
import { HiddenInfoList } from "./HiddenInfoList";
import userEvent from "@testing-library/user-event";

describe('HiddenInfoList', () => {
    it('should render a "Create new" button when there are no Hidden Infos created yet.', () => {
        const { getByText } = render(<HiddenInfoList onSave={jest.fn()} />);

        getByText('Hidden Info');
        getByText('Create new');
    });

    it('should render a form after pressing the "create new" Button.', async () => {
        const { getByText, getByLabelText } = render(<HiddenInfoList onSave={jest.fn()} />);

        await userEvent.click(getByText('Create new'));

        getByLabelText('Hidden Info Condition IDs');
        getByLabelText('Hidden Info Description');
    });

    it('should call onSave when saving form', async () => {
        const onSaveMock = jest.fn();
        const { getByLabelText, getByText } = render(<HiddenInfoList onSave={onSaveMock} />);

        await userEvent.click(getByText('Create new'));

        await userEvent.type(getByLabelText('Hidden Info Condition IDs'), 'skill_magic,skill_brawn');
        await userEvent.type(getByLabelText('Hidden Info Description'), 'The fox jumped over the badger-bear.');

        expect(onSaveMock).toHaveBeenCalledTimes(0);
        await userEvent.click(getByText('Save'));
        expect(onSaveMock).toHaveBeenCalledTimes(1);
        expect(onSaveMock).toHaveBeenCalledWith([
            expect.objectContaining(
                {
                    conditionIDs: ['skill_magic', 'skill_brawn'],
                    description: 'The fox jumped over the badger-bear.'
                }
            )
        ]);
    });
});
