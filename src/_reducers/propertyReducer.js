const initialState = {
  create: {
    loading: false,
  },
};
function flexReducer(state = initialState, action) {
  switch (action.type) {
    //CREATE
    case "PROPERTY_CREATE_REQUEST":
      return { ...state, create: { ...action.body, loading: action.loading} };
    case "PROPERTY_CREATE_SUCCESS":
      return { ...state, create: { ...action.body, loading: action.loading} };
    case "PROPERTY_CREATE_FAILURE":
      return { ...state, create: { ...action.body, loading: action.loading} };
    //GETALL
    case "PROPERTY_GETALL_REQUEST":
      return { ...state, loading: action.loading};
    case "PROPERTY_GETALL_SUCCESS":
      return { ...state, loading: action.loading, properties: {...action.body} };
    case "PROPERTY_GETALL_FAILURE":
      return { ...state, loading: action.loading, properties: {...action.body} };
    default:
      return state;
  }
}

export default flexReducer;
