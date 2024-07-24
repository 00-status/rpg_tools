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
//      Store the dialogue tree in local storage
//          dialogue_tree: { treeID: string, treeName: string, dialogues: Array<Dialogue> }
//      Clear the whoole dialogue tree.

// TODO: Exporting and Importing
//      Filter out empty choices and hidden infos when exporting.
//      Allow a user to upload an existing dialogue tree.


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
