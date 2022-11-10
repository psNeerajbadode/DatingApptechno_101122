import { PASSCODE, PASSWORD } from '../actions/ActionType';

const initialState = {};

const currentRecovery = (state = initialState, action) => {
  switch (action.type) {
    case PASSCODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default currentRecovery;
