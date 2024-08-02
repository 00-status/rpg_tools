import { ReactNode } from "react";
import ReactModal from "react-modal";

import './modal.css';
import { Button } from "../Button/Button";

type Props = {
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    isOpen: boolean;
    onClose: () => void;
};

export const Modal = (props: Props) => {
    return <ReactModal className="modal" overlayClassName="modal-overlay" isOpen={props.isOpen}>
        <div className="modal__contents">
            <div className="modal__title">
                <h2>{props.title}</h2>
                <Button onClick={props.onClose}>X</Button>
            </div>
            <div>
                {props.children}
            </div>
            <div className="modal__footer">
                {props.footer}
            </div>
        </div>
    </ReactModal>;
};
