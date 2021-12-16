const initialState = {
    extendUser:{},
    isLogedIn:false,
}


const usersReducer = (state = initialState , {type, payload}) =>{
    switch (type) {
        case "LOG_IN":
            return{
                extendUser:payload,
                isLogedIn:true
        }
            case "SIGN_UP":
            return{
                extendUser:payload,
                isLogedIn:true
            }
            case "LOG_OUT":
            return{
                extendUser:{},
                isLogedIn:false
            }
        default:
            return state ;
            
    }
}
export default usersReducer;