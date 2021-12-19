import { combineReducers } from "redux";
import showTheAlert from "./showAlert";
import handleGuestState from "./isGuest";
import handleTimeState from "./setTime";
import handleLanguageState from "./setLanguage";

const rootReducer=combineReducers({
    showTheAlert,
    handleGuestState,
    handleTimeState,
    handleLanguageState
});

export default rootReducer