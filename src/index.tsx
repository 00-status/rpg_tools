import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import "@react-sigma/core/lib/react-sigma.min.css";

import { DialogueTreeMaker } from './DialogueTreeMaker/DialogueTreeMaker';
import { CharacterMaker } from './CharacterMaker/CharacterMaker';


// TODO: Hidden Infos:
//      Display created hidden infos inside the description Card.
//      Allow one to delete hidden infos inside the description Card.
//      Prevent horizontal scroll in hidden info modal.

// TODO: Exporting and Importing
//      Allow a user to upload an existing dialogue tree.

// TODO: Misc.
//      Allow the user to select character nameColor by colour wheel.
//      Round to a certain precision to avoid rounding errors.
//      Fix ID duplication in choice input forms.
//      Change node colour based on character name colour
//      Add a nice save icon for making new dialogues and new hidden infos.

// Feature Idea: Blades for Dialogue Trees.
// Feature Idea: Put the creation of hidden info in a modal, then display the hidden info beneath the description field.
//      This would help visually associate hidden info with the description field.

// Strapi - nodeJS
// Vercel - host

ReactModal.setAppElement('#app');

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
