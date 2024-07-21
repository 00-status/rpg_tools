import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import "@react-sigma/core/lib/react-sigma.min.css";
import { DialogueTreeMaker } from './AreaMaker/DialogueTreeMaker';
import { CharacterMaker } from './CharacterMaker/CharacterMaker';

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
