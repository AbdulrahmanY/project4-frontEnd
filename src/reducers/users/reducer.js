const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const userRole = JSON.parse(localStorage.getItem("userRole"));
const initialState = {
  user: user ? user : {},
  token:token ? token : undefined,
  isLogedIn:user?user:undefined,
  userRole:userRole?userRole:{}
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        user: payload,
        token:state.token,
        isLogedIn:payload,
        userRole:state.userRole
      };
      case "SIGN_UP":
    //   localStorage.setItem("user", JSON.stringify(payload));
      return {
        user: payload,
      };
      case "ADD_TOKEN":
      localStorage.setItem("token", JSON.stringify(payload));
      return {
        user: state.user,
        token:payload,
        isLogedIn:state.user,
        userRole:state.userRole
      };
    case "LOG_OUT":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      return {
        user: {},
        token:undefined,
        isLogedIn:undefined,
        userRole:{}
      };
      case "CHANGE_USERNAME":
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        user: payload,
        token:state.token,
        isLogedIn:state.user,
        userRole:state.userRole
      };
      case "USER_ROLE":
        localStorage.setItem("userRole", JSON.stringify(payload));
      return {
        user: state.user,
        token:state.token,
        isLogedIn:state.user,
        userRole:payload
      };

    default:
      return state;
  }
};

export default userReducer;
