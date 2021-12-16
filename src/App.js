import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Home from "./components/Home"

function App() {
	return (
		<div className="root container">
			<Router>
			<div>
				<Navbar />
				<Alert />
					<Switch>

						<Route exact path="/">
							<Home/>
						</Route>
						{/* <Route exact path="/about">
							<About />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/signup">
							<Signup  />
						</Route> */}
					</Switch>
			</div>
			</Router>
		</div>
	);
}

export default App;
