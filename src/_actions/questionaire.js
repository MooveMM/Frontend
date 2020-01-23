//This is just for template to show off tokenApi

import { tokenApi, api } from "../util/api";
import { request, requestFailure, requestSuccess } from "../util/actions";

export function addData(data) {
  return async dispatch => {
    console.log(data);
    dispatch(requestSuccess("QUESTIONAIRE_ADD_DATA", data));
  };
}

export function analyse() {
  console.log("way!");
  return async (dispatch, getState) => {
    const state = getState();
    const token = state.user.token
    console.log(token)

    var requestObject = {
        size: state.questionaire.size,
        rooms: state.questionaire.rooms,
        position: state.questionaire.position,
        texts: [
            {text: state.questionaire.introduction, key: "introduction"},
            {text: state.questionaire.neighbourhood, key: "neighbourhood"},
            {text: state.questionaire.neighbours, key: "neighbours"},
            {text: state.questionaire.dreamAccomodation, key: "dreamAccomodation"},
            {text: state.questionaire.worstAccomodation, key: "worstAccomodation"}
        ]
    }

    console.log(requestObject)
    dispatch(request("QUESTIONAIRE_ANALYSE_REQUEST"));
    return tokenApi(
      "/api/v1/useranalyser/analyser/analyse",
      "POST",
      token,
      {
        ...requestObject
      }
    )
      .then(result => {
        console.log(result);
        dispatch(requestSuccess("QUESTIONAIRE_ANALYSE_SUCCESS", result));
      })
      .catch(err => {
        dispatch(requestFailure("QUESTIONAIRE_ANALYSE_FAILURE", err));
        console.log(err);
      });
  };
}
