
import nameSpace from "../name-space.js";
import {createSelector} from "reselect";

const NAME_SPACE = nameSpace.DATA;



const concatData = (data) => {
    let result = [];
    data.forEach((item) => {
        result = result.concat(item);
    });
    return result;  
}

export const getLoadingStatus = (state) => {
    return state[NAME_SPACE].isLoading;
}

export const getTasks = (state) => {
    return concatData(state[NAME_SPACE].tasks);
}

export const getUnits = (state) => {
    return concatData(state[NAME_SPACE].units);
}

export const getFunctions = (state) => {
    return concatData(state[NAME_SPACE].functions);
}

export const getRoleUnit = (state) => {
    return concatData(state[NAME_SPACE].roleUnit);
}
