import { combineReducers } from "redux";
import showTheAlert from "./showAlert";
import handleGuestState from "./isGuest";
import handleTimeState from "./setTime";
import handleLanguageState from "./setLanguage";
import handleTestState from "./startTest";
import handleWordState from "./getWords";
import handleActiveWordState from "./activeWordState";
import handleRightCharacterState from "./rightCharacter"
import handleTestCompleteState from "./testComplete";
import handleLiveWpmState from "./liveWpm";
import handleWrongCharacterState from "./wrongCharacter";
import handleLiveAccuracyState from "./liveAccuracy";
import handleLiveTimerState from "./liveTimer";

const rootReducer=combineReducers({
    showTheAlert,
    handleGuestState,
    handleTimeState,
    handleLanguageState,
    handleTestState,
    handleWordState,
    handleActiveWordState,
    handleRightCharacterState,
    handleTestCompleteState,
    handleLiveWpmState,
    handleWrongCharacterState,
    handleLiveAccuracyState,
    handleLiveTimerState
});

export default rootReducer