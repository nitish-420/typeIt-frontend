import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store"
import {Provider} from "react-redux"

// store.subscribe(()=> console.log(store.getState()));

ReactDOM.render(
	// <React.StrictMode> 
	//removing this Strict mode as it was showing some error.
		<Provider store={store}>
			<App />
		</Provider>,
	// </React.StrictMode>,
	document.getElementById("root")
);
