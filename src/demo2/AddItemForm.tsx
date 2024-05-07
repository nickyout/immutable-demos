import { useCallback, useState } from "react";

export const AddItemForm = ({ onSubmit }: { onSubmit: (label: string) => void; }) => {

    const [label, setLabel] = useState('');
    const onFormSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(label);
        setLabel('');
    }, [label, onSubmit]);

    return (
        <form style={{ padding: 8 }} onSubmit={onFormSubmit}>
            <label>Add item: </label>
            <input type="text" value={label} onChange={(event) => setLabel(event.target.value)}/>
            <button>Add</button>
        </form>
    );
};
