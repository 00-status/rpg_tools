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
                <a className="nav-item" onClick={() => goToRoute('/')}>Dialogue Tree</a>
                <a className="nav-item" onClick={() => goToRoute('/characters')}>Characters</a>
            </nav>
        </div>
        <div className="page-content-container">
            {props.children}
        </div>
        <div className="footer">
            <div>
                Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a>
            </div>
        </div>
    </div>;
};
