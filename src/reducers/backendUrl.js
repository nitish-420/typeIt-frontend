// var backendUrlSql="https://type-it-backend.herokuapp.com/"
// var backendUrl="http://localhost:5000/"
//above one is for localhost
var backendUrl="https://typeit-mongodb.herokuapp.com/"


const handleBackendUrlState=(state=backendUrl,action)=>{
    switch(action.type){
        default : return state;
    }
}

export default handleBackendUrlState