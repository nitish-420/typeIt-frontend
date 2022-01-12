import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Home from "./components/Home"
import Login from "./components/Login";
import About from "./components/About"
import User from "./components/User"
import Footer from "./components/Footer";
import Leaderboard from "./components/LeaderBoard"
import UpdateUser from "./components/UpdateUser";

function App() {


	return (
		<>
		<div className="root bg-dark container">
			<Router>
				<Navbar />
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
						<Route exact path="/leaderboard">
							<Leaderboard/>
						</Route>
						<Route exact path="/updateuser">
							<UpdateUser/>
						</Route>
					</Switch>
			</Router>
		</div>
		<Footer/>
		</>
	);
}

export default App;
