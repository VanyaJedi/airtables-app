
import {extend} from "../../utils.js";

const initialState = {
    filters: []
};

const actionType = {
    SET_FILTER: `SET_FILTER`,
};

const actionCreator = {
  setFilter: (filter) => {
    return {
      type: actionType.SET_FILTER,
      payload: filter,
    };
  },
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_FILTER:
      return extend(state, {filters: action.payload});
    
    default:
      return state;
  }
};

export {reducer, actionType, actionCreator};
