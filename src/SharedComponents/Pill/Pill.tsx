import { ReactNode } from "react";

import './pill.css';

type Props = {
    children: ReactNode;
};

export const Pill = (props: Props) => {
    return <div className="pill">
        {props.children}
    </div>;
};
