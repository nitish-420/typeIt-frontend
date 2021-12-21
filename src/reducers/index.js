import { combineReducers } from "redux";
import showTheAlert from "./showAlert";
import handleGuestState from "./isGuest";
import handleTimeState from "./setTime";
import handleLanguageState from "./setLanguage";
import handleRestartState from "./restartState";
import handleTestState from "./startTest";
import handleWordState from "./getWords";
import handleActiveWordState from "./activeWordState";

const rootReducer=combineReducers({
    showTheAlert,
    handleGuestState,
    handleTimeState,
    handleLanguageState,
    handleTestState,
    handleRestartState,
    handleWordState,
    handleActiveWordState
});

export default rootReducer