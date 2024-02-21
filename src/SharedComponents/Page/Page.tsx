import { ReactElement, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./app.css";

type Props = {
    title: string;
    children: ReactNode;
    footer?: ReactElement;
};

export const Page = (props: Props): ReactElement => {
    const navigate = useNavigate();
    const location = useLocation();

    const goToRoute = (newPath: string) => {
        if (newPath !== location.pathname) {
            navigate(newPath);
        }
    };

    return <div className="page">
        <div className="page-title-container">
            <div className="page-title">{props.title}</div>
            <nav className="nav-list" >
                <a className="nav-item" onClick={() => goToRoute('/')}>About Me</a>
                <a className="nav-item" onClick={() => goToRoute('/dice_roller')} >Dice Roller</a>
                <a className="nav-item" onClick={() => goToRoute('/weapon_maker')} >Weapon Maker</a>
            </nav>
        </div>
        <div className="page-content-container">
            {props.children}
        </div>
        <div className="footer">
            <hr className="divider" />
            {props.footer}
        </div>
    </div>;
};
