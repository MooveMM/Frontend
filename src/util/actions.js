/**
 * Action that starts a request by activating the loading parameter
 * @method
 * @name request
 * @returns an object containing the action type and loading parameter
 */ 
export function request(action) {
    return {
      type: action,
      loading: true
    }
}

/**
 * Action that marks a succesful api call by returning the body of the response and re-setting the loading parameter to false
 * @method
 * @name requestSuccess
 * @returns an object containing the action type, loading parameter and response body
 */ 
export function requestSuccess(action, body) {
  return {
    type: action,
    loading: false,
    body: body
  }
}

/**
 * Action that marks a failed api call by returning the exception from the response and re-setting the loading parameter to false
 * @method
 * @name requestFailure
 * @returns an object containing the action type, loading parameter and response exception
 */ 
export function requestFailure(action, exception) {
  return {
    type: action,
    loading: false,
    exception: exception
  }
}

/**
 * Action that resets a value in a reducer
 * @method
 * @name reset
 * @returns an object containing the action type
 */ 
export function reset(action) {
  return {
    type: action
  }
}

/**
 * Action that toggles a value in a reducer to the new specified value
 * @method
 * @name toggle
 * @returns an object containing the action type and the new value to be set
 */ 
export function toggle(action, body) {
  return {
    type: action,
    body: body
  }
}