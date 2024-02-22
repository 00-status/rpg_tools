import { render } from "@testing-library/react";
import { AreaMaker } from "./AreaMaker";
import { Children } from "react";



jest.mock('../SharedComponents/Page/Page', () => {
    return {
        Page: ({ children }: {children: typeof Children}) => <>{children}</>
    };
});

describe('AreaMaker', () => {
    it('should display the adventure title', () => {
        const { getByLabelText, getByRole } = render(<AreaMaker />);

        expect(getByLabelText('Adventure Name')).toBeInTheDocument();
    });
});
