import { ReactNode } from "react";

import './button.css';

type Props = {
    buttonTheme?: ButtonTheme;
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
};

export enum ButtonTheme {
    Default = 'default-button',
    Delete = 'delete-button'
};

export const Button = (props: Props) => {
    return <button
        className={props.buttonTheme ? props.buttonTheme : ButtonTheme.Default}
        disabled={props?.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </button>;
};
