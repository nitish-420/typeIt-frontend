let languageState="English"

const handleLanguageState=(state=languageState,action)=>{
    let lang=state
    switch(action.type){
        case "SETEnglish": return "English";
        case "SETPython": return "Python";
        case "SETC": return "C";
        case "SETJava": return "Java";
        case "SETJavascript": return "Javascript";
        case "GETLANGUAGE": return lang;
        default : return state;
    }
}

export default handleLanguageState