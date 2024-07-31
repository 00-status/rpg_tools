import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "@react-sigma/core/lib/react-sigma.min.css";

import { DialogueTreeMaker } from './DialogueTreeMaker/DialogueTreeMaker';
import { CharacterMaker } from './CharacterMaker/CharacterMaker';


// TODO: Selecting Characters:
//      Grab a list of characters using the useCharacters hook
//      Display the list in the DialogueMaker component as a dropdown.

// TODO: Exporting and Importing
//      Allow a user to upload an existing dialogue tree.

// TODO: Allow the user to select character name by colour wheel.
// TODO: Round to a certain precision to avoid rounding errors.
// TODO: Add download and delete icons.
// Feature Idea: Blades for Dialogue Trees.
// Feature Idea: Put the creation of hidden info in a modal, then display the hidden info beneath the description field.

// Strapi - nodeJS
// Vercel - host

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
