import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Login from "./components/Login";
import About from "./components/About"
import User from "./components/User"
import { useSelector } from "react-redux";

function App() {

	

	const testState=useSelector((state)=>{
		return state.handleTestState
	})


	return (
		<div className="root bg-dark container">
			<Router>
			<div>
				{!testState && <Navbar />}
				<Alert />
					<Switch>

						<Route exact path="/">
							<Home/>
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
						<Route exact path="/user">
							<User/>
						</Route>
					</Switch>
			</div>
			</Router>
		</div>
	);
}

export default App;
