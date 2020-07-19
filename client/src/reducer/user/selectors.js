
import nameSpace from "../name-space.js";

const NAME_SPACE = nameSpace.USER;


export const getAuthStatus = (state) => {
    return state[NAME_SPACE].authStatus;
}

export const getUser = (state) => {
    return state[NAME_SPACE].user;
}