import { render } from "@testing-library/react";
import { HiddenInfo } from "./HiddenInfo";
import userEvent from "@testing-library/user-event";

describe('HiddenInfo', () => {
    it('should render a "Create new" button when there are no Hidden Infos created yet.', () => {
        const { getByText } = render(<HiddenInfo onSave={jest.fn()} />);

        getByText('Hidden Info');
        getByText('Create new');
    });

    it('should render a form after pressing the "create new" Button.', async () => {
        const { getByText, getByLabelText } = render(<HiddenInfo onSave={jest.fn()} />);

        await userEvent.click(getByText('Create new'));

        getByLabelText('Hidden Info Condition IDs');
        getByLabelText('Hidden Info Description');
    });

    it('should disable the form after filling it out and saving it', async () => {
        const onSaveMock = jest.fn();
        const { getByLabelText, getByText } = render(<HiddenInfo onSave={onSaveMock} />);

        await userEvent.type(getByLabelText('Hidden Info Condition IDs'), 'skill_magic,skill_brawn');
        await userEvent.type(getByLabelText('Hidden Info Description'), 'The fox jumped over the badger-bear.');

        expect(onSaveMock).toHaveBeenCalledTimes(0);
        await userEvent.click(getByText('Save'));
        expect(onSaveMock).toHaveBeenCalledTimes(1);
        expect(onSaveMock).toHaveBeenCalledWith([
            { 
                conditionIDs: ['skill_magic', 'skill_brawn'],
                description: 'The fox jumped over the badger-bear.'
             }
        ]);

        expect(getByLabelText('Hidden Info Condition IDs')).toBeDisabled();
        expect(getByLabelText('Hidden Info Description')).toBeDisabled();
    });

    it('should not be able to save when ID and description are empty', async () => {
        const onSaveMock = jest.fn();
        const { getByText } = render(<HiddenInfo onSave={onSaveMock} />);

        await userEvent.click(getByText('Save'));

        expect(onSaveMock).not.toHaveBeenCalled();
    });
});
