type Props = {
    id?: string;
    name?: string;
    options: Array<{ label: string, value: string }>;
    onOptionSelect: (optionValue: string) => void;
};

export const Dropdown = (props: Props) => {
    return <select onChange={(event) => {
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
    </select>;
};
