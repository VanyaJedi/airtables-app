
import {extend} from "../../utils.js";

const initialState = {
    activeTab: 'tasks'
};

const actionType = {
    SWITCH_TAB: `SWITCH_TAB`,
};

const actionCreator = {
  switchTab: (tab) => {
    return {
      type: actionType.SWITCH_TAB,
      payload: tab,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SWITCH_TAB:
      return extend(state, {activeTab: action.payload});
    default:
      return state;
  }
};

export {reducer, actionType, actionCreator};
