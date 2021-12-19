let languageState="English"

const handleLanguageState=(state=languageState,action)=>{
    switch(action.type){
        case "SETEnglish": return "English";
        case "SETPython": return "Python";
        case "SETC": return "C";
        case "SETJava": return "Java";
        case "SETJavascript": return "Javascript";
        case "GETLANGUAGE": return state;
        default : return state;
    }
}

export default handleLanguageState