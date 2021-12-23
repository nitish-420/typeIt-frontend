import { combineReducers } from "redux";
import showTheAlert from "./showAlert";
import handleGuestState from "./isGuest";
import handleTimeState from "./setTime";
import handleLanguageState from "./setLanguage";
import handleRestartState from "./restartState";
import handleTestState from "./startTest";
import handleWordState from "./getWords";
import handleActiveWordState from "./activeWordState";
import handleRightCharacterState from "./rightCharacter"
import handleTestCompleteState from "./testComplete";
import handleRunningTimeState from "./timeState";
import handleLiveWpmState from "./liveWpm";
import handleWrongCharacterState from "./wrongCharacter";
import handleLiveAccuracyState from "./liveAccuracy";


const rootReducer=combineReducers({
    showTheAlert,
    handleGuestState,
    handleTimeState,
    handleLanguageState,
    handleTestState,
    handleRestartState,
    handleWordState,
    handleActiveWordState,
    handleRightCharacterState,
    handleTestCompleteState,
    handleRunningTimeState,
    handleLiveWpmState,
    handleWrongCharacterState,
    handleLiveAccuracyState
});

export default rootReducer