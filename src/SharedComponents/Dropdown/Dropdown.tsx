import './dropdown.css';

type Props = {
    id?: string;
    label?: string;
    options: Array<{ label: string, value: string }>;
    onOptionSelect: (optionValue: string) => void;
};

export const Dropdown = (props: Props) => {
    return <div className='dropdown'>
        {props.label && <label htmlFor={props.id} >{props.label}</label>}
        <select className='dropdown__select' id={props.id} onChange={(event) => {
            const dropdownValue = event.currentTarget.value;
            props.onOptionSelect(dropdownValue);
        }}>
            {props.options.map((option) => {
                return <option
                    key={option.value}
                    value={option.value}
                >
                    {option.label}
                </option>;
            })}
        </select>
    </div>;
};
