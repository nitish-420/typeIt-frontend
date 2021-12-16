import {createStore,applyMiddleware} from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension'

import thunk from "redux-thunk" 

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))


const store = createStore(
    rootReducer,
    composedEnhancer
);
// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );


// const store=createStore(rootReducer, applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store