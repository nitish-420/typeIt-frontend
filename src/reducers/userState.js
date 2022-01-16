const initialState={
    id:null,
    userName:null,
    fName:null,
    lName:null,
    email:null,
    numberOfTestsGiven:null,
    totalTimeSpend:null,
    dateOfAccountCreated:null,
    bestSpeed:null,
    averageSpeed:null,
    bestAccuracy:null,
    averageAccuracy:null,
    status:null,
    tests:[],
    bests:[]
}

const handleUserState=(state=initialState,action)=>{

    switch(action.type){

        case "SETUSER":
            return {...action.payload}

        case "RESETUSER":
            return {...initialState}

        default : return state;
    }
}

export default handleUserState