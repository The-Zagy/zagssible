import { useRef, useState } from "react";
import { mount } from "@zaggsible/ui";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TodoList } from "./Todo";
import { Home } from "./Home";

const App = () => {
	const zaggesible = useRef(false);
	if (!zaggesible.current) {
		zaggesible.current = true;
		mount();
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/todo" element={<TodoList />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
