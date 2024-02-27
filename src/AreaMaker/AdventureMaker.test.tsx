import { render } from "@testing-library/react";
import { Children } from "react";

import { AdventureMaker } from "./AdventureMaker";

jest.mock('../SharedComponents/Page/Page', () => {
    return {
        Page: ({ children }: {children: typeof Children}) => <>{children}</>
    };
});

describe('AdventureMaker', () => {
    it('should display the area maker\'s forms', () => {
        const { getByLabelText, getByText } = render(<AdventureMaker />);

        getByLabelText('Adventure ID');
        getByLabelText('Adventure Name');

        getByText('SigmaJS Container');

        getByLabelText('Area ID');
        getByLabelText('Area Name');
        getByLabelText('Area Description');
    });

    it('should display the Points of Interest form.', () => {
        const { getByLabelText, getByText } = render(<AdventureMaker />);

        getByText('Points of Interest (POI)');
        getByLabelText('POI Condition IDs');
        getByLabelText('POI Name');
        getByLabelText('POI Type');
        getByLabelText('POI Description');
    });

    it('should display the paths form.', () => {
        const { getByLabelText, getByText } = render(<AdventureMaker />);

        getByText('Paths');
        getByLabelText('Path Condition ID');
        getByLabelText('Path Next-area ID');
        getByLabelText('Path Short Description');
    });
});
