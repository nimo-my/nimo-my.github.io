import React from "react";
import styles from "../css/Todo.module.css";

export function TodoBox({
	checked,
	id,
	value,
	changeCheckBox,
	deleteTodoList,
}) {
	return (
		<div className={styles.contentBox}>
			{checked === true ? (
				<input
					key={id}
					type="checkbox"
					onChange={() => changeCheckBox(id)}
					checked={checked}
				/>
			) : (
				<input
					key={id}
					type="checkbox"
					onChange={() => changeCheckBox(id)}
					checked={checked}
				/>
			)}

			{/* 초기값 설정 */}
			<div className={checked ? styles.done : styles.todoText}>
				{value !== "" && value}
			</div>

			<div
				className={styles.todoIconX}
				onClick={() => deleteTodoList(id)}>
				❌
			</div>
		</div>
	);
}

export const MemoizedTodoBox = React.memo(TodoBox);
