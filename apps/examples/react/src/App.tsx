import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mount } from "@zaggsible/ui";
const App = () => {
	const [count, setCount] = useState(0);
	const zaggesible = useRef(null);
	if (!zaggesible.current) {
		zaggesible.current = mount();
	}
	return (
		<div className="App">
			<p>
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				Tempore est consequatur fugiat molestias exercitationem optio
				cum odit aliquam beatae veniam? Consequatur quaerat iusto
				distinctio recusandae nostrum hic repellat vitae praesentium!
			</p>
		</div>
	);
};

export default App;
