import { useState } from "react";

import { toggleTodo, updateTodo } from "../redux/actions";
import { deleteTodo } from "../redux/actions";

import { useDispatch } from "react-redux";

const Todo = ({ todo }) => {

    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(todo?.data);

    const dispatch = useDispatch();

    const onFormSubmit = (e) => {
        e.preventDefault();

        setEditing(prevState => !prevState);

        dispatch(updateTodo(todo._id, text))
    }

    return (
        <li
            className="task"
            style={{
                textDecoration: todo?.done ? 'line-through' : '',
                color: todo?.done ? '#bdc3c7' : '#34495e'
            }}
            data-testid="todo-test"
        >
            <input
                type="checkbox"
                checked={todo?.done}
                onChange={() => dispatch(toggleTodo(todo._id))}
                style={{verticalAlign: 'middle', transform:'scale(1.3)',margin: '0 12px'}}
            />

            <span style={{ display: editing ? 'none' : '' }}>{todo?.data}</span>

            <form
                style={{ display: editing ? 'inline' : 'none' }}
                onSubmit={onFormSubmit}
            >
                <input
                    type="text"
                    value={text}
                    className="edit-todo"
                    onChange={(e) => setText(e.target.value)}
                />
            </form>

            <span className="icon" onClick={() => dispatch(deleteTodo(todo._id))}>
                <i className="fas fa-trash" />
            </span>

            <span className="icon" onClick={() => setEditing(prevState => !prevState)}>
                <i className="fas fa-pen" />
            </span>
        </li>

    )
}

export default Todo;