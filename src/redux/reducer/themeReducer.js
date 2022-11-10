// import {  } from '../actions/actionsTypes';

import { THEMEMODE } from '../actions/ActionType';
const initialState = {
  selectedTheme: true,
};
function themeReducer(state = initialState, action) {
  switch (action.type) {
    case THEMEMODE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

export default themeReducer;
