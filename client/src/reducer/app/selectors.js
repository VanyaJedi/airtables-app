
import nameSpace from "../name-space.js";

const NAME_SPACE = nameSpace.APP;


export const getFilters = (state) => {
    return state[NAME_SPACE].filters;
}