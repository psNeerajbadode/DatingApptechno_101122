// import {  } from '../actions/actionsTypes';

import {LOGIN, LOGOUT, STAP} from '../actions/ActionType';

const initialState = {};
function Stapreducer(state = initialState, action) {
  switch (action.type) {
    case STAP:
      return {...state, ...action.payload};
    case LOGIN:
      return {...state, ...action.payload};
    case LOGOUT:
      return {initialState, ...action.payload};
    default:
      return state;
  }
}

export default Stapreducer;
