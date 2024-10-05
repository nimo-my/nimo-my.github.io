import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import Home from "./routes/Home";
import Todo from "./routes/Todo";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/todo"
					element={<Todo />}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
