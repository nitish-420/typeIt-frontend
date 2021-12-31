import { combineReducers } from "redux";
import showTheAlert from "./showAlert";
import handleGuestState from "./isGuest";
import handleTimeState from "./setTime";
import handleLanguageState from "./setLanguage";
import handleTestState from "./startTest";
import handleWordState from "./getWords";
import handleActiveWordState from "./activeWordState";
import handleRightCharacterState from "./rightCharacter"
import handleUserState from "./userState";

const rootReducer=combineReducers({
    showTheAlert,
    handleGuestState,
    handleTimeState,
    handleLanguageState,
    handleTestState,
    handleWordState,
    handleActiveWordState,
    handleRightCharacterState,
    handleUserState
});

export default rootReducer