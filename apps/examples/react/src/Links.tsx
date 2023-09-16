import { Link } from "react-router-dom";

export const Links = () => {
	return (
		<div>
			<h1>Links</h1>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/todo">Todo</Link>
				</li>
			</ul>
		</div>
	);
};
