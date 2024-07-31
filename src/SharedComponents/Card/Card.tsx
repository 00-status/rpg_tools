import { ReactNode } from "react";

import './card.css';
import { Button } from "../Button/Button";

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
                <Button onClick={props.buttonAction}>{props.buttonName}</Button>
            }
        </div>
        {props.children}
    </div>
};
