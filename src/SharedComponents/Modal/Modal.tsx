import { ReactNode } from "react";
import ReactModal from "react-modal";

import './modal.css';

type Props = {
    title: string;
    children: ReactNode;
    isOpen: boolean;
};

export const Modal = (props: Props) => {
    return <ReactModal className="modal" overlayClassName="modal-overlay" isOpen={true}>
        {props.children}
    </ReactModal>;
};
