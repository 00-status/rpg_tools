import './text-info.css';

type Props = {
    label?: string;
    value: string|number;
    id: string;
    placeholder?: string;
    onChange: (value?: string) => void;
    readonly?: boolean;
};

export const TextInput = (props: Props) => {
    const { label, value, id, placeholder, onChange, readonly } = props;

    return <div className="text-input">
        {label && <label htmlFor="id">{label}</label>}
        <input
            readOnly={readonly}
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
