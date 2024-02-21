import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { Page } from "./Page";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
    return {
        ...jest.requireActual("react-router-dom"),
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: '/' })
    };
});

describe('Page', () => {
    it('should render the contents', () => {
        const {getByText} = render(<Page title="Test">Banana</Page>);

        getByText("Banana");
    });

    it('should render the passed in title', () => {
        const {getByText} = render(<Page title="This is a test title">Test</Page>);

        getByText("This is a test title");
    });

    it('should render the passed in footer', () => {
        const footer = <>TEST FOOTER!</>
        const {getByText} = render(<Page title="title" footer={footer}>Test</Page>);

        getByText("TEST FOOTER!");
    });

    it('should switch to new route when clicking nav item', async () => {
        const { getByText } = render(<Page title="This is a test title">Test</Page>);

        expect(mockNavigate).toHaveBeenCalledTimes(0);
        
        await userEvent.click(getByText('Weapon Maker'));

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/weapon_maker');
    });

    it('should NOT navigate when clicking the current nav item', async () => {
        const { getByText } = render(<Page title="Testing page">Test</Page>);
        
        await userEvent.click(getByText('About Me'));

        expect(mockNavigate).toHaveBeenCalledTimes(0);
    });
});
