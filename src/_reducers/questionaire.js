const initialState = {
  texts: [],
  result: {}
};
function questionaireReducer(state = initialState, action) {
  switch (action.type) {
    //QUESTIONAIRE
    case "QUESTIONAIRE_ADD_DATA":
      return { ...state, ...action.body };
    case "QUESTIONAIRE_ANALYSE_REQUEST":
      return { ...state, loading: action.loading};
    case "QUESTIONAIRE_ANALYSE_SUCCESS":
      return { ...state, loading: action.loading, result: {...action.body} };
    case "QUESTIONAIRE_ANALYSE_FAILURE":
      return { ...state, loading: action.loading, error: action.exception };
      case "LOGIN_LOGOUT":
            return initialState;
    default:
      return state;
  }
}

export default questionaireReducer;
