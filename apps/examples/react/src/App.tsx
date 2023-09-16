import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mount } from "@zaggsible/ui";

interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [inputValue, setInputValue] = useState("");
	const zaggesible = useRef(false);
	if (!zaggesible.current) {
		zaggesible.current = true;
		mount();
	}
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const handleAddTodo = () => {
		if (inputValue.trim() === "") {
			return;
		}

		const newTodo: Todo = {
			id: Date.now(),
			text: inputValue,
			completed: false,
		};

		setTodos([...todos, newTodo]);
		setInputValue("");
	};

	const handleToggleTodo = (id: number) => {
		const updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					completed: !todo.completed,
				};
			}
			return todo;
		});

		setTodos(updatedTodos);
	};

	const handleDeleteTodo = (id: number) => {
		const updatedTodos = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodos);
	};

	return (
		<div>
			<h1>Todo App</h1>
			<input
				type="text"
				value={inputValue}
				onChange={handleInputChange}
			/>
			<button onClick={handleAddTodo}>Add Todo</button>
			<ul>
				{todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="checkbox"
							checked={todo.completed}
							onChange={() => handleToggleTodo(todo.id)}
						/>
						<span
							style={{
								textDecoration: todo.completed
									? "line-through"
									: "none",
							}}
						>
							{todo.text}
						</span>
						<button onClick={() => handleDeleteTodo(todo.id)}>
							Delete
						</button>
						<img src="https://picsum.photos/200/300" />
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
