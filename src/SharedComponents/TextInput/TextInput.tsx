import './text-info.css';

type Props = {
    label?: string;
    value: string|number;
    id: string;
    placeholder?: string;
    onChange: (value?: string) => void;
};

export const TextInput = (props: Props) => {
    const { label, value, id, placeholder, onChange } = props;

    return <div className="text-input">
        {label && <label htmlFor="id">{label}</label>}
        <input
            type="text"
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={(value) => {
                const newValue = value.target.value ?? '';
                onChange(newValue);
            }}
        />
    </div>;
};
