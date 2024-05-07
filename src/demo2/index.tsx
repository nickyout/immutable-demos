import { CSSProperties, memo, useCallback, useState } from "react";
import { AddItemForm } from "./AddItemForm";

const containerStyle: CSSProperties = { display: "flex", flexDirection: "column", flex: 1, overflow: 'auto', padding: 8 };

type TodoItem = {
    label: string;
    done: boolean;
};

const Page2 = () => {

    const [todoList, setTodoList] = useState(() => [
        { label: "Laundry", done: true },
        { label: "Groceries", done: true },
        { label: "Vacuuming", done: false }
    ]);

    const toggleDone = useCallback((item: TodoItem) => {
        setTodoList((todoList) => {
            const index = todoList.indexOf(item);
            /** --------- Start of assignment --------- */

            const newTodoList = [...todoList];
            newTodoList[index].done = !newTodoList[index].done;
            return newTodoList;

            /** --------- End of assignment --------- */
        });
    }, []);

    const onAddItemSubmit = useCallback((label: string) => {
        setTodoList((todoList) => [...todoList, { label, done: false }])
    }, []);

    return (
        <div style={containerStyle}>
            <AddItemForm onSubmit={onAddItemSubmit}/>
            <TodoListComponent items={todoList} onClick={toggleDone}/>
        </div>
    );
}

const TodoListComponent = memo(({ items, onClick }: { items: TodoItem[], onClick: (item: TodoItem) => void }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: 8 }}>
            {items.map((item, index) => (
                <TodoItemComponent key={index} item={item} onClick={onClick}/>
            ))}
        </div>
    );
});

const TodoItemComponent = memo(({ item, onClick }: { item: TodoItem, onClick: (item: TodoItem) => void }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', padding: 8 }}>
            <input type="checkbox" checked={item.done} onChange={() => onClick(item)}/>
            <span style={{ textDecoration: item.done ? 'line-through' : undefined }}>
                {item.label}
            </span>
        </div>
    );
});

export default Page2;