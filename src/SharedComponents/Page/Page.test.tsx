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
});
