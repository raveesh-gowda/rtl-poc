import NavBar from "./Components/NavBar";
import { BrowserRouter } from "react-router-dom";

function App() {
	return (
		<>
			<h3>RTL POC</h3>
			<BrowserRouter>
				<NavBar />
			</BrowserRouter>
		</>
	);
}

export default App;
