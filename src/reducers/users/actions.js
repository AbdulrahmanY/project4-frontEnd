export const logIn = (user)=> {
    return {
        type:"LOG_IN",
        payload:user
    };
};

export const addToken = (token)=> {
    return {
        type:"ADD_TOKEN",
        payload:token
    };
};

export const signUp = (user)=>{
    return{
        type:"SIGN_UP",
        payload:user
    }
}
export const changeUsername = (user)=>{
    return{
        type:"CHANGE_USERNAME",
        payload:user
    }
}

export const logOut = ()=>{
    return{
        type:"LOG_OUT",
    }
}
export const setUserRole = (userRole)=>{
    return{
        type:"USER_ROLE",
        payload:userRole
    }
}