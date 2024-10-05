import { useState, useEffect } from "react";
import { MemoizedTodoBox } from "./TodoBox";
import styles from "../css/Todo.module.css";

function Todo() {
	// useState
	const [input, setInput] = useState("");
	const [todoList, setTodoList] = useState(() => {
		const storedTodos = localStorage.getItem("todoList");
		// storedTodos가 배열인지 확인하고, 아니면 빈 배열로 설정
		return storedTodos ? JSON.parse(storedTodos) : [];
	});

	// 입력 필드 변화 처리
	const onInputChange = (e) => {
		setInput(e.target.value);
	};

	// 새로운 TODO 항목 추가
	const makeTodoBox = () => {
		if (input.trim() !== "") {
			// todoList가 배열인지 확인하고 배열로 처리
			if (!Array.isArray(todoList)) {
				console.error("todoList is not an array. Resetting to empty array.");
				setTodoList([]);
				return;
			}

			const newTodoList = [
				...todoList,
				{ id: Date.now(), content: input, checked: false }, // 새 항목은 기본적으로 unchecked
			];
			setTodoList(newTodoList); // 상태 업데이트
			setInput(""); // 입력 필드 초기화
		}
	};

	// 체크박스 상태 변경
	const changeCheckBox = (id) => {
		if (!Array.isArray(todoList)) return; // 배열이 아니면 실행하지 않음

		const updatedTodoList = todoList.map((todo) =>
			todo.id === id ? { ...todo, checked: !todo.checked } : todo
		);
		setTodoList(updatedTodoList); // 상태 업데이트
	};

	// TODO 항목 삭제
	const deleteTodoList = (id) => {
		if (!Array.isArray(todoList)) return; // 배열이 아니면 실행하지 않음

		const updatedTodoList = todoList.filter((todo) => todo.id !== id);
		setTodoList(updatedTodoList); // 상태 업데이트
	};

	// 로컬스토리지에 데이터 저장
	useEffect(() => {
		if (Array.isArray(todoList)) {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
	}, [todoList]);

	return (
		<div className={styles.app}>
			<div className={styles.title}>Todo list</div>
			<div
				id="todo-input-wrapper"
				style={{ display: "row" }}>
				<input
					value={input}
					onChange={onInputChange}
					className={styles.inputWrapper}
					onKeyDown={(e) => {
						if (e.nativeEvent.isComposing) {
							return;
						}
						if (e.key === "Enter") {
							makeTodoBox();
						}
					}}
					placeholder="Write down your new TODOs! :)"
				/>
				<button
					onClick={makeTodoBox}
					className={styles.postButton}>
					post
				</button>
			</div>

			{todoList.length > 0 && // todoList가 비어있지 않을 때만 map 실행
				todoList.map((todo) => (
					<MemoizedTodoBox
						key={todo.id} // 고유식별번호(꼭 넣어줘야함!!)
						id={todo.id} // id 전달
						value={todo.content}
						checked={todo.checked} // checked 상태 전달
						changeCheckBox={changeCheckBox} // 함수 전달
						deleteTodoList={deleteTodoList} // 함수 전달
					/>
				))}
		</div>
	);
}

export default Todo;
