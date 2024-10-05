import { Link } from "react-router-dom";
import "../css/Home.css";

function Home() {
	return (
		<div class="mainWrapper">
			<div class="mainImage"></div>

			<div class="textWrapper">
				<h1>Welcome, Stranger!</h1>
				<h2>This is jisoo's homepage.</h2>
				<h3 style={{ color: "black" }}>*Test Page*</h3>
				<nav>
					<Link to="todo">Todo</Link>
				</nav>
			</div>
		</div>
	);
}

export default Home;
