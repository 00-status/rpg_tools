import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import "@react-sigma/core/lib/react-sigma.min.css";
import { DialogueTreeMaker } from './DialogueTreeMaker/DialogueTreeMaker';
import { CharacterMaker } from './CharacterMaker/CharacterMaker';


// TODO: Selecting Characters:
//      Add an ID field to the characters tab.
//      Grab a list of characters using the useCharacters hook
//      Display the list in the DialogueMaker component as a dropdown.

// TODO: Local Storage
//      Clear the whoole dialogue tree.
//      Clean up naming scheme in graph util.

// TODO: Exporting and Importing
//      Filter out empty choices and hidden infos when exporting.
//      Allow a user to upload an existing dialogue tree.

// TODO: Allow the user to select character name by colour wheel.
// TODO: Round to a certain precision to avoid rounding errors.

// Strapi - nodeJS

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find App!');
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <DialogueTreeMaker />,
    },
    {
        path: "/characters",
        element: <CharacterMaker />,
    }
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router}/>);
