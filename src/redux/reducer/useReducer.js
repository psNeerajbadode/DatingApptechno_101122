// import {  } from '../actions/actionsTypes';

import { PASSCODE } from '../actions/ActionType';

const initialState = {};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case PASSCODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default userReducer;
