import { ReactNode } from "react";

import './card.css';

type Props = {
    title: string;
    buttonName?: string;
    buttonAction?: () => void;
    children: ReactNode;
};

export const Card = (props: Props) => {
    return <div className="card">
        <div className="card__title">
            <h3>{props.title}</h3>
            {
                props.buttonName &&
                props.buttonAction &&
                <button onClick={props.buttonAction}>{props.buttonName}</button>
            }
        </div>
        {props.children}
    </div>
};
