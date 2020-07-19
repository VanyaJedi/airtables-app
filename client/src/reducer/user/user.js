
import {extend} from "../../utils.js";

  
const initialState = {
    user: null,
   /* user: {
        email: "vanya71310@gmail.com",
        name: "Ivan",
        role: "admin",
    }*/
};

const actionType = {
    SET_USER: `SET_USER`,
};

const actionCreator = {
    setUser: (user) => ({
        type: actionType.SET_USER,
        payload: user
    }),
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return extend(state, {user: action.payload});
        default:
        return state;
    }
};

const Operation = {

    googleAuth: () => (dispatch, getState, api) => {
        return api.get(`/auth/google`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
              }
        });
      },

    checkAuth: () => (dispatch, getState, api) => {
      return api.get(`/checkUser`)
        .then((response)=>{
            dispatch(actionCreator.setUser(response.data));
        })
    },

    logout: () => (dispatch, getState, api) => {
        return api.get(`/logout`)
          .then((response)=>{
              console.log(response.data);
              dispatch(actionCreator.setUser(null));
          })
      },
    
};
  
export {reducer, actionType, actionCreator, Operation};
