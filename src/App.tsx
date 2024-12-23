import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import MainContent from "./components/MainContent";

function App() {
	return (
		<Router>
			<div className="flex h-screen">
				<Sidebar />
				<div className="flex flex-wrap justify-between w-full rounded">
					<Routes>
						<Route path="/" element={<MainContent />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
