import { combineReducers } from "redux";
import showTheAlert from "./showAlert";
import handleGuestState from "./isGuest";
import handleTimeState from "./setTime";
import handleLanguageState from "./setLanguage";
import handleTestState from "./startTest";
import handleWordState from "./getWords";
import handleUserState from "./userState";
import handleBackendUrlState from "./backendUrl";

const rootReducer=combineReducers({
    showTheAlert,
    handleGuestState,
    handleTimeState,
    handleLanguageState,
    handleTestState,
    handleWordState,
    handleUserState,
    handleBackendUrlState
});

export default rootReducer