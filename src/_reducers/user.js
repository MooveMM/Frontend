const initialState = {
    loggedIn: false,
    result: {}
  };
  function userReducer(state = initialState, action) {
    switch (action.type) {
      //LOGIN
      case "LOGIN_LOGIN_REQUEST":
        return { ...state, loading: action.loading};
      case "LOGIN_LOGIN_SUCCESS":
        return { loading: action.loading, loggedIn: true, ...action.body };
      case "LOGIN_LOGIN_FAILURE":
        return { ...state, loading: action.loading,loginError:{ ...action.exception }};
        case "LOGIN_LOGOUT":
        return initialState;
      //Register
      case "LOGIN_REGISTER_REQUEST":
        return { ...state, loading: action.loading};
      case "LOGIN_REGISTER_SUCCESS":
        return { loading: action.loading,registerSuccess: true,  ...action.body };
      case "LOGIN_REGISTER_FAILURE":
        return { ...state, loading: action.loading, registerError: {...action.exception} };
      default:
        return state;
    }
  }
  
  export default userReducer;
  