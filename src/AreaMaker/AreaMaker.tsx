import { ReactElement } from "react";
import { Page } from "../SharedComponents/Page/Page";

export const AreaMaker = (): ReactElement => {
    // Create a form where the user can enter the Area's information into.
    //      Adventure Name
    //      Area ID
    //      Area name
    //      Description
    //      Hidden Areas
    //      Points of interest
    //      Paths
    //          Lead to other areas via an ID.
    //          An ID must be entered for it to be valid, adventure_end can be used if it is the last area.
    // Create a way to make new, attached areaas.
    // When Area A leads to Area B, link the two areas together in SigmaJS.

    return <Page title="Area Builder">
        <div>
            <label htmlFor="adventure-name">Adventure Name</label>
            <input type="text" id="adventure-name" value={'testBalue'} />
        </div>
    </Page>;
};
